
from rest_framework import routers, serializers, viewsets
from store import models


class ProductsSerializer(serializers.HyperlinkedModelSerializer):

    prices = serializers.DictField()

    def get_prices(self, product):
        prices = [[str(p.price_set), str(p)] for p in product.price_set.all()]
        return dict(prices)

    class Meta:
        model = models.Product
        fields = ('name', 'picture', 'active', 'picture', 'prices')


class ProductsViewSet(viewsets.ModelViewSet):
    """
    Get Products (readonly API)
    """
    queryset = models.Product.objects.all()
    serializer_class = ProductsSerializer

    class Meta:
        model = models.Product


router = routers.DefaultRouter()
router.register('products', ProductsViewSet)

