from __future__ import unicode_literals

from django.db import models


class UserMeta(models.Model):
    """
    Store user related stuff, like avatar,
    encryption keys, and other foo bar.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    avatar = models.ImageField(upload_to='avatars/', default='/static/store/img/default_avatar.png')

