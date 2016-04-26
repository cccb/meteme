from django.conf.urls import url, include

from rest_framework import routers, viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from mete import models as mete_models
from store import models as store_models

from moneyed import Money
from api import serializers

from pprint import pprint


class AccountsViewSet(viewsets.ModelViewSet):
    """
    Manage user accounts.
    """
    queryset = mete_models.Account.objects.all()

    @detail_route(methods=['post'])
    def deposit(self, request, pk=None):
        """
        Make deposit using the deposit serializer
        """
        account = mete_models.Account.objects.get(id=pk)

        serializer = serializers.DepositSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        # Update user account
        old_balance = account.balance
        new_balance = old_balance + serializer.validated_data['amount']
        account.balance = new_balance
        account.save()

        # Respond with account
        account_serializer = serializers.AccountSerializer(account)

        result = {
            "account": account_serializer.data,
            "old_balance": str(old_balance),
            "new_balance": str(new_balance),
        }
        return Response(result)


    @detail_route(methods=['post'])
    def purchase(self, request, pk=None):
        """
        Make purchase using the purchase serializer
        """
        account = mete_models.Account.objects.get(id=pk)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        # Get validated product
        product = serializer.validated_data['product']

        # Create serializer for docs
        account_serializer = serializers.AccountSerializer(account)
        product_serializer = serializers.ProductSerializer(product)

        # Withdraw amount from account
        old_balance = account.balance
        new_balance = old_balance - product.price
        account.balance = new_balance
        account.save()

        result = {
            "product": product_serializer.data,
            "account": account_serializer.data,
            "old_balance": str(old_balance),
            "new_balance": str(new_balance),
        }
        return Response(result)


    def get_serializer_class(self):
        """
        Switch serializers for browsable api
        """
        if self.action == 'deposit':
            return serializers.DepositSerializer
        if self.action == 'purchase':
            return serializers.PurchaseSerializer

        return serializers.AccountSerializer


    def get_view_description(self, html):
        """
        Return extended / dynamic view description for
        detail view.
        """
        doc = super(AccountsViewSet, self).get_view_description(html=False)

        if self.action == 'retrieve':
            pk = self.kwargs.get('pk', 1)

            detail_urls = ['deposit', 'purchase']

            doc += "\n\n**Available detail routes:**\n\n"
            for detail in detail_urls:
                url = "/api/accounts/{pk}/{detail}/".format(pk=pk, detail=detail)
                doc += "* [{url}]({url})\n".format(url=url)

            doc += "\n\n"

        cls = type('CLS', (), {"__doc__": doc})
        return views.get_view_description(cls, html)


class ProductsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Get Products (readonly API)
    """
    queryset = store_models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

    class Meta:
        model = store_models.Product


class TransfersViewSet(viewsets.GenericViewSet):
    """
    Handle user to user transfers
    """
    serializer_class = serializers.TransferSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        # Get source, dest and amount
        from_account = serializer.validated_data['from_account']
        to_account = serializer.validated_data['to_account']
        amount = serializer.validated_data['amount']

        # Prevent stealing money
        if amount < Money(0, currency='EUR'):
            amount *= -1

        # Create serializers
        from_account_serializer = serializers.AccountSerializer(from_account)
        to_account_serializer = serializers.AccountSerializer(to_account)

        if from_account.id is not to_account.id:
            # Since the account was already loaded, this
            # would cause kind of a race condition and would lead to
            # spontaneous money formation.
            from_account.balance -= amount
            from_account.save()

            to_account.balance += amount
            to_account.save()

        result = {
            "from_account": from_account_serializer.data,
            "to_account": to_account_serializer.data,
        }

        return Response(result)


router = routers.DefaultRouter()
router.register('accounts', AccountsViewSet)
router.register('products', ProductsViewSet)
router.register('transfers', TransfersViewSet, base_name='transfers')
