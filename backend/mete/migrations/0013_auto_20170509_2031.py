# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-05-09 20:31


from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mete', '0012_auto_20170216_1801'),
    ]

    operations = [
        migrations.AlterField(
            model_name='barcode',
            name='account',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mete.Account'),
        ),
    ]
