
from rest_framework import serializers
from moneyed import Money


class MoneyField(serializers.Field):
    """
    Mony objects are serialized into a string <Amount> <Currency>
    """
    def to_representation(self, obj):
        """ Money to string """
        return obj.__unicode__()

    def to_internal_value(self, data):
        """ String to Money """
        amount, currency = data.split()
        return Money(amount, currency)
