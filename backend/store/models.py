from django.db import models
from djmoney.models.fields import MoneyField

import mete

DEFAULT_PRICE_SET_ID = 1


class PriceSet(models.Model):
    """
    Prices are organized in sets.
    Per default products use the DEFAULT_PRICE_SET_ID, which
    will be most likely 1. (It is automatically created in 
    migration 0002_create_default_price_set.)
    """
    name = models.CharField(max_length=20)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = "Price Set"


class Price(models.Model):
    """
    Since products might have special prices on different occasions,
    we define prices by price sets.
    """

    price_set = models.ForeignKey(PriceSet,
                                  null=True,
                                  blank=False,
                                  default=DEFAULT_PRICE_SET_ID,
                                  on_delete=models.SET_DEFAULT)

    product = models.ForeignKey('Product', on_delete=models.CASCADE)

    amount = MoneyField(max_digits=10,
                        decimal_places=2,
                        default_currency='EUR')

    def __unicode__(self):
        return self.amount.__unicode__()

    class Meta:
        unique_together = ('price_set', 'product')


class Product(models.Model):
    """
    Product: Buy this!
    """
    name = models.CharField(max_length=80)

    picture = models.ImageField(
        upload_to='products/',
        default='/static/store/img/product_default.png')

    active = models.BooleanField(default=True)

    def __unicode__(self):
        return self.name

    @property
    def price(self):
        settings = mete.models.Settings.get_solo()

        try:
            price = Price.objects.get(product=self, price_set=settings.price_set)
        except:
            # fallback
            default_price_set = PriceSet.objects.get(name='default')
            price = Price.objects.get(product=self, price_set=default_price_set)

        return price

    @property
    def prices(self):
        """
        Generate dict from all prices in the following schema:
            'price_set': 'price'
        """
        prices = [[str(p.price_set), str(p)] for p in self.price_set.all()]
        return dict(prices)


class Log(models.Model):
    """
    Single log entry, for recording transactions.
    """
    product = models.OneToOneField(Product,
                                   on_delete=models.SET_NULL,
                                   null=True,
                                   blank=True)

    product_name = models.CharField(max_length=80)

    product_amount = MoneyField(decimal_places=2,
                                max_digits=10,
                                default_currency='EUR')

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
