
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from mete import models


@receiver(pre_save, sender=models.Account)
def update_transaction_log(sender, instance, raw, using, update_fields,
                           **kwargs):
    """
    Whenever the balance in an account changes,
    create a new transaction.
    """
    new_account = instance
    try:
        old_account = models.Account.objects.get(id=new_account.id)
        old_balance = old_account.balance
    except:
        old_balance = 0

    diff = new_account.balance - old_balance

    # Create transaction log entry
    models.Transaction.objects.create(amount=diff)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_account(sender, instance, **kwargs):
    """
    Automatically create user account, when a new
    user is created.
    """
    Account.objects.create(user=instance)

