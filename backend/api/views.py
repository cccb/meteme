from django.conf.urls import url, include

from rest_framework import routers, serializers, viewsets
from mete import models as mete_models
from store import models as store_models

from moneyed import Money
from api.serializers import MoneyField

class AccountSerializer(serializers.ModelSerializer):

    balance = MoneyField(default=Money('0.00', 'EUR'))
    avatar = serializers.ImageField(read_only=True)

    class Meta:
        model = mete_models.Account
        fields = ('name', 'email', 'avatar', 'balance', 'created_at',
                  'updated_at')


class AccountViewSet(viewsets.ModelViewSet):
    """
    Manage user accounts
    """
    queryset = mete_models.Account.objects.all()
    serializer_class = AccountSerializer



class ProductsSerializer(serializers.HyperlinkedModelSerializer):

    prices = serializers.DictField()

    def get_prices(self, product):
        prices = [[str(p.price_set), str(p)] for p in product.price_set.all()]
        return dict(prices)

    class Meta:
        model = store_models.Product
        fields = ('name', 'picture', 'active', 'picture', 'prices')


class ProductsViewSet(viewsets.ModelViewSet):
    """
    Get Products (readonly API)
    """
    queryset = store_models.Product.objects.all()
    serializer_class = ProductsSerializer

    class Meta:
        model = store_models.Product



router = routers.DefaultRouter()
router.register('accounts', AccountViewSet)
router.register('products', ProductsViewSet)
