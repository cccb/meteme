"""
Download gravatar avatars for all users.
"""

from os.path import basename
from urllib.request import urlretrieve
from urllib.parse import urlsplit

from django.core.files import File
from django.core.management.base import BaseCommand, CommandError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import models as auth_models

from mete import gravatar
from mete import models as mete_models
from store import models as store_models


def _download_to_field(account):
    """Download avatar"""
    if not account.user.email:
        return

    # Download gravatar
    url = gravatar.avatar_url(account.user.email)
    try:
        tempname, _ = urlretrieve(url)
    except:
        print(" ...error")
        return

    account.avatar.save(
        basename(urlsplit(url).path), File(open(tempname, 'rb')))
    



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
            print("Processing: {}".format(account.user.username))
            _download_to_field(account)


