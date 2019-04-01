"""
Download gravatar avatars for all users.
"""

from django.core.management.base import BaseCommand, CommandError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import models as auth_models

from mete import gravatar
from mete import models as mete_models
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
        accounts = mete_models.Account.objects.all()
        for account in accounts:
            account.avatar = None
            account.save()


