# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-03 13:59


from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mete', '0004_auto_20160503_1207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='store.Product'),
        ),
    ]
