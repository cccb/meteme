# Generated by Django 2.1.7 on 2019-03-31 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mete', '0014_auto_20190326_1827'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='avatar',
            field=models.ImageField(blank=True, default='default_avatar.png', null=True, upload_to='avatars/'),
        ),
    ]
