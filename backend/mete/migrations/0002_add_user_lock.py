# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-28 20:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mete', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='disabled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='locked',
            field=models.BooleanField(default=False),
        ),
    ]