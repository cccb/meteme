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
        amount, currency = data.split()
        return Money(amount, currency)


class AccountSerializer(serializers.ModelSerializer):

    balance = MoneyField(default=Money('0.00', 'EUR'))
    avatar = serializers.ImageField(read_only=True)

    class Meta:
        model = mete_models.Account
        fields = ('name', 'email', 'avatar', 'balance', 'created_at',
                  'updated_at')


class ProductSerializer(serializers.ModelSerializer):

    price = MoneyField(default=Money('0.00', 'EUR'))
    prices = serializers.DictField()

    def get_prices(self, product):
        prices = [[str(p.price_set), str(p)] for p in product.price_set.all()]
        return dict(prices)

    class Meta:
        model = store_models.Product
        fields = ('name', 'picture', 'active', 'picture', 'prices', 'price')


class PaymentSerializer(serializers.Serializer):
    """
    Serialize / parse payment
    """
    account = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=mete_models.Account.objects.all())

    product = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=store_models.Product.objects.all())

    def create(self, validated_data):
        """
        Create payment, withdraw amount from accounts balance
        """
        account = validated_data['account']
        product = validated_data['product']

        account_serializer = AccountSerializer(account)
        product_serializer = ProductSerializer(product)

        # Withdraw amount from account
        old_balance = account.balance
        new_balance = old_balance - product.price
        account.balance = new_balance
        account.save()

        result = {
            "product": product_serializer.data,
            "account": account_serializer.data,
            "price": str(product.price),
            "old_balance": str(old_balance),
            "new_balance": str(new_balance),
        }
        return result

    def save(self):
        """
        Wrapper for create payment
        """
        return self.create(self.validated_data)


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

    def create(self, validated_data):
        """
        Create transfer, withdraw money from source account
        add to dest account.
        """
        return False
