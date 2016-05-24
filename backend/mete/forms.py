
from django import forms
from mete import models

from moneyed import Money

class AccountForm(forms.ModelForm):
    """
    Custom modelform, to override save behaviour
    for adding transactions whenever the balance has changed.
    """

    def save(self, commit=True):
        """ Save model form, add transaction if nessecary """

        # Load old instance from DB
        old_instance = models.Account.objects.get(id=self.instance.id)
        old_balance = old_instance.balance

        instance = super(AccountForm, self).save(commit)
        new_balance = instance.balance

        diff = new_balance - old_balance

        # Create Transaction
        if diff > Money(0.0, currency=old_balance.currency):
            transaction = models.Transaction(amount=diff)
            transaction.save()

        return instance


    class Meta:
        model = models.Account
        exclude = []


