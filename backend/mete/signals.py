from django.dispatch import receiver
from django.db.models.signals import pre_save

from mete import models

@receiver(pre_save, sender=models.Account)
def update_transaction_log(sender, instance, raw, using, update_fields,
                           **kwargs):
    """
    Whenever the balance in an account changes,
    create a new transaction.
    """
    print "ACCOUNT CHANGED!"
    print update_fields
    print "END ACCOUNT CHANGED!"
