from __future__ import unicode_literals

from django.db import models
from djmoney.models.fields import MoneyField

class Account(models.Model):
    """
    User account:
    We manage user accounts, separate from 'Users', because
    they don't have a password, may not have an email,
    and have an avatar.
    """
    name = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    avatar = models.ImageField(upload_to='avatars/',
                               default='/static/store/img/default_avatar.png',
                               null=True, blank=True)

    balance = MoneyField(max_digits=10,
                         decimal_places=2,
                         default_currency='EUR')

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __unicode__(self):
        return self.name



class KeyPair(models.Model):
    """
    A user may supply a public/private key pair,
    so we can encrypt the audit log.

    If a user does not have a key pair, no personal
    log will be created.

    The the keys are created on the client using the NaCL
    crypto library.

    The private key is encrypted with a key derived from a password / pin,
    using the 'Password-Base Key Derivation Function 2' (PBKDF2) with
    at least 3 million iterations.

    The first 4 bytes of the encrypted private key determin
    additional hashing rounds as a measure against rainbow tables.
    """
    account = models.OneToOneField(Account, on_delete=models.CASCADE)

    crypto_version = models.PositiveSmallIntegerField(default=1)

    private_key = models.CharField(max_length=68,
                                   blank=False,
                                   null=False,
                                   unique=True)
    public_key = models.CharField(max_length=64,
                                  blank=False,
                                  null=False,
                                  unique=True)
    verify_key = models.CharField(max_length=64,
                                  blank=False,
                                  null=False,
                                  unique=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)


class Transaction(models.Model):
    """
    Log Transactions.
    Do not store the associated account.

    This is just an audit log.
    """
    amount = MoneyField(max_digits=10,
                        decimal_places=2,
                        default_currency='EUR')

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
