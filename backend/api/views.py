from django.conf.urls import url, include

from rest_framework import routers, viewsets, status
from rest_framework.response import Response

from mete import models as mete_models
from store import models as store_models

from moneyed import Money
from api import serializers

from pprint import pprint


class AccountsViewSet(viewsets.ModelViewSet):
    """
    Manage user accounts
    """
    queryset = mete_models.Account.objects.all()
    serializer_class = serializers.AccountSerializer


class ProductsViewSet(viewsets.ModelViewSet):
    """
    Get Products (readonly API)
    """
    queryset = store_models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

    class Meta:
        model = store_models.Product


class PaymentsViewSet(viewsets.ViewSet):
    """
    Handle payments
    """
    serializer_class = serializers.PaymentSerializer

    def create(self, request):
        serializer = serializers.PaymentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.save())


class TransfersViewSet(viewsets.ViewSet):
    """
    Handle user to user transfers
    """
    serializer_class = serializers.TransferSerializer

    def create(self, request):
        pass


router = routers.DefaultRouter()
router.register('accounts', AccountsViewSet)
router.register('products', ProductsViewSet)
router.register('payments', PaymentsViewSet, base_name='payments')
router.register('transfers', TransfersViewSet, base_name='transfers')
