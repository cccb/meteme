from django.conf.urls import url, include
from django.contrib.auth import models as auth_models

from rest_framework import routers, viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from mete import models as mete_models
from store import models as store_models

from moneyed import Money
from api import serializers

from pprint import pprint


class UserAccountViewSet(viewsets.ModelViewSet):
    """
    Manage user accounts
    """
    serializer_class = serializers.UserSerializer
    queryset = auth_models.User.objects.filter(is_active=True,
                                               account__is_disabled=False)

    @detail_route(methods=['post'])
    def deposit(self, request, pk=None):
        """
        Make deposit using the deposit serializer
        """
        user = auth_models.User.objects.get(id=pk)

        serializer = serializers.DepositSerializer(data=request.data)
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


class ProductsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Get Products (readonly API)
    """
    queryset = store_models.Product.objects.filter(active=True)
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


router = routers.DefaultRouter()
router.register('users', UserAccountViewSet)
router.register('products', ProductsViewSet)
router.register('transfers', TransfersViewSet, base_name='transfers')
