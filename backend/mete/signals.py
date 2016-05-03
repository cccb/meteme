
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from mete import models


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_account(sender, instance, created, **kwargs):
    """
    Automatically create user account, when a new
    user is created.
    """
    if created:
        models.Account.objects.create(user=instance)

