from rest_framework import serializers
from moneyed import Money

from mete import models as mete_models
from store import models as store_models


class MoneyField(serializers.Field):
    """
    Money objects are serialized into a string <Amount> <Currency>
    """
    def to_representation(self, obj):
        """ Money to string """
        return obj.__unicode__()

    def to_internal_value(self, data):
        """ String to Money """
        try:
            amount, currency = data.split()
        except:
            amount, currency = (data, 'EUR')

        return Money(amount, currency)


class AccountSerializer(serializers.ModelSerializer):

    balance = MoneyField(default=Money('0.00', 'EUR'))
    avatar = serializers.ImageField(read_only=True)

    class Meta:
        model = mete_models.Account
        fields = ('id', 'name', 'email', 'avatar', 'balance', 'created_at',
                  'updated_at')


class ProductSerializer(serializers.ModelSerializer):

    price = MoneyField(default=Money('0.00', 'EUR'))
    prices = serializers.DictField(read_only=True)

    def get_prices(self, product):
        prices = [[str(p.price_set), str(p)] for p in product.price_set.all()]
        return dict(prices)

    class Meta:
        model = store_models.Product
        fields = ('name', 'picture', 'active', 'picture', 'prices', 'price')


class PurchaseSerializer(serializers.Serializer):
    """
    (De-)Serialize Purchase
    """
    product = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=store_models.Product.objects.all())


class DepositSerializer(serializers.Serializer):
    """
    Serialize a single money field as deposit.
    """
    amount = MoneyField(default=Money('0.00', 'EUR'))


class TransferSerializer(serializers.Serializer):
    """
    (De-)Serialize transfers
    """
    from_account = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=mete_models.Account.objects.all())

    to_account = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=mete_models.Account.objects.all())

    amount = MoneyField(default=Money('0.00', 'EUR'))
