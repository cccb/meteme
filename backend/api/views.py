from datetime import datetime

from moneyed import Money

from django.conf.urls import url, include
from django.contrib.auth import login, logout, \
                                models as auth_models

from django.contrib.auth.models import AnonymousUser

from rest_framework import routers, status, views
from rest_framework.decorators import detail_route
from rest_framework.viewsets import ModelViewSet, GenericViewSet,\
                                    ReadOnlyModelViewSet

from rest_framework.exceptions import AuthenticationFailed
from rest_framework.serializers import ValidationError

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from mete.models import Account, Transaction, Barcode
from store.models import Product, Category

from api import serializers
from api.serializers import SessionSerializer, UserSerializer, \
                            AuthenticationSerializer, \
                            AccountSerializer, DepositSerializer, \
                            PurchaseSerializer, TransferSerializer

from backend.settings import BACKEND_VERSION

from pprint import pprint

class SessionViewSet(GenericViewSet):
    """ Login / Logout user """
    permission_classes = [AllowAny]
    serializer_class = AuthenticationSerializer

    @property
    def session(self):
        """ Get current session state """
        authenticated = type(self.request.user) is not AnonymousUser

        session = {
            'is_authenticated': authenticated,
            'user': self.request.user,
        }
        return session


    def list(self, request):
        """ Render session """
        serialized_session = SessionSerializer(self.session)
        return Response(serialized_session.data)


    def create(self, request):
        """ Create a session with credentials """
        serializer = AuthenticationSerializer(data=request.data)

        if not serializer.is_valid():
            if 'non_field_errors' in serializer.errors:
                raise AuthenticationFailed('Invalid credentials')

            raise ValidationError(serializer.errors)

        # Credentials are valid, let's login the user
        login(request, serializer.validated_data['user'])

        serialized_session = SessionSerializer(self.session)
        return Response(serialized_session.data)


    def delete(self, request):
        """ Logout user """
        logout(request)
        serialized_session = SessionSerializer(self.session)
        return Response(serialized_session.data)


class UserAccountViewSet(ModelViewSet):
    """ Manage user accounts """

    serializer_class = UserSerializer
    queryset = auth_models.User.objects.filter(
        is_active=True,
        account__is_disabled=False).order_by('username')

    @detail_route(methods=['post'])
    def deposit(self, request, pk=None):
        """
        Make deposit using the deposit serializer
        """
        user = auth_models.User.objects.get(id=pk)

        serializer = DepositSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        deposit = serializer.create(user)

        # Serialize result and create response
        user_serializer = serializers.UserSerializer(deposit['user'])
        return Response({
            "user": user_serializer.data,
            "old_balance": str(deposit['old_balance']),
            "new_balance": str(deposit['new_balance']),
        })


    @detail_route(methods=['post'])
    def purchase(self, request, pk=None):
        """
        Make purchase using the purchase serializer
        """
        user = auth_models.User.objects.get(id=pk)

        # Get purchase serializer
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        purchase = serializer.create(user)

        # Create serializer for docs
        user_serializer = serializers.UserSerializer(purchase['user'])
        product_serializer = serializers.ProductSerializer(purchase['product'])

        return Response({
            "product": product_serializer.data,
            "user": user_serializer.data,
            "old_balance": str(purchase['old_balance']),
            "new_balance": str(purchase['new_balance']),
        })


    def get_serializer_class(self):
        """
        Switch serializers for browsable api
        """
        if self.action == 'deposit':
            return serializers.DepositSerializer
        if self.action == 'purchase':
            return serializers.PurchaseSerializer

        return serializers.UserSerializer


    def get_view_description(self, html):
        """
        Return extended / dynamic view description for
        detail view.
        """
        doc = super(UserAccountViewSet, self).get_view_description(html=False)

        if self.action == 'retrieve':
            pk = self.kwargs.get('pk', 1)

            detail_urls = ['deposit', 'purchase']

            doc += "\n\n**Available detail routes:**\n\n"
            for detail in detail_urls:
                url = "/api/users/{pk}/{detail}/".format(pk=pk, detail=detail)
                doc += "* [{url}]({url})\n".format(url=url)

            doc += "\n\n"

        cls = type('CLS', (), {"__doc__": doc})
        return views.get_view_description(cls, html)


    class Meta:
        model = auth_models.User


#class ProductsViewSet(ReadOnlyModelViewSet):
#    """
#    Get Products (readonly API)
#    """
#    queryset = Product.objects.filter(active=True)
#    serializer_class = serializers.ProductSerializer
#
#    class Meta:
#        model = Product
#

class ProductsViewSet(GenericViewSet):
    """ReadOnly Products API"""
    queryset = Product.objects.filter(active=True)
    serializer_class = serializers.ProductSerializer

    def list(self, request):
        """Get list of products"""

        # Try to get user settings for the request user:
        try:
            filtered_categories = request.user.usersetting.categories.all()
            products = Product.objects.filter(categories=filtered_categories)
        except Exception as e:
            products = Product.objects.all()

        serializer = serializers.ProductSerializer(products, many=True)
        return Response(serializer.data)




class TransfersViewSet(GenericViewSet):
    """
    Handle user to user transfers
    """
    serializer_class = serializers.TransferSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        transfer = serializer.create()

        # Serialize and create response
        from_account_serializer = serializers.AccountSerializer(
            transfer['from_account']
        )
        to_account_serializer = serializers.AccountSerializer(
            transfer['to_account']
        )
        return Response({
            "from_account": from_account_serializer.data,
            "to_account": to_account_serializer.data,
        })


class StatsViewSet(GenericViewSet):
    """
    Handle stats:
      show: transactions, cash position, amount of
      donations. Overall and for the current month.

    This view set is public and can be viewed without being logged in.
    """
    permission_classes = [AllowAny]

    def list(self, request):
        """ Show stats """
        now = datetime.now()
        current_month = (now.year, now.month)

        user_count = auth_models.User.objects.filter(
            is_active=True, account__is_disabled=False).count()

        accounts = Account.objects.all()
        accounts_sum = sum([a.balance for a in accounts])

        transactions_count = Transaction.objects.all().count()
        transactions_months = Transaction.objects.grouped_month()
        transactions_current_count = len(transactions_months.get(current_month,
                                                                 []))

        donations = Transaction.objects.donations()
        donations_total = sum(abs(d.amount) for d in donations)
        donations_grouped = Transaction.objects.donations_grouped_months()
        donations_current_sum = sum(
            abs(d.amount) for d in donations_grouped.get(current_month, []))

        stats = {
            'money_gauge': accounts_sum,
            'donations': {
                'total': donations_total,
                'current_month': donations_current_sum,
            },
            'transactions': {
                'total': transactions_count,
                'current_month': transactions_current_count,
            },
            'users': user_count,
            'backend_version': BACKEND_VERSION,
        }

        serialized_stats = serializers.StatsSerializer(stats)
        return Response(serialized_stats.data)



class TransactionsLogViewSet(ReadOnlyModelViewSet):
    """ Get list of all transactions """
    permission_classes = [AllowAny]
    queryset = Transaction.objects.all()

    serializer_class = serializers.TransactionSerializer


class BarcodeLookupViewSet(GenericViewSet):
    """Lookup barcode"""

    def retrieve(self, request, pk=None):
        """
        Fetch barcode and return serialized product
        or serialized user.
        """
        try:
            barcode = Barcode.objects.get(number=pk)
        except:
            return Response({'error': 'Barcode not found'}, status=404)


        if barcode.account:
            serializer = serializers.UserSerializer(barcode.account.user)
        else:
            serializer = serializers.ProductSerializer(barcode.product)

        return Response(serializer.data)


router = routers.DefaultRouter()
router.register('barcode', BarcodeLookupViewSet, base_name='barcode')
router.register('session', SessionViewSet, base_name='session')
router.register('users', UserAccountViewSet)
router.register('products', ProductsViewSet)
router.register('transfers', TransfersViewSet, base_name='transfers')
router.register('stats', StatsViewSet, base_name='stats')
router.register('transactions', TransactionsLogViewSet, base_name='transactions')
