"""
Clear all product pictures
"""

from django.core.management.base import BaseCommand, CommandError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import models as auth_models

from store import models as store_models

class Command(BaseCommand):

    def add_arguments(self, parser):
        """
        Additional arguments 
        """

    def handle(self, *args, **options):
        """
        Import all gravatar images.
        """
        products = store_models.Product.objects.all()
        for product in products:
            print("Clearing {}".format(product.name))
            product.picture = None
            product.save()


