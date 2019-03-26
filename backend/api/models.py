

from django.db import models


class Api(models.Model):
    """
    Create pseudo model to provide API ACCESS permissions.
    """
    class Meta:
        permissions = [('api_access', 'Api Access')]
        default_permissions = []
        managed = False


