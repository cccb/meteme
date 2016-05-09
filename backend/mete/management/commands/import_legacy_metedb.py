"""
Import legacy mete database.
At least the users.
Maybe the products.
"""

from django.core.management.base import BaseCommand, CommandError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import models as auth_models

from mete import models as mete_models
from store import models as store_models

import sqlite3
from pprint import pprint


class Command(BaseCommand):

    def add_arguments(self, parser):
        """
        Additional arguments (like: path to the databse to import)
        """
        parser.add_argument('-d',
                            '--database',
                            required=True,
                            help="The sqlite3 database to import")


    def _fetch_named_list(self, cursor):
        """
        Fetch query result, return list of dicts with:
        dict(row) = { 'col_name': data, ... }
        """
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]

        result = [dict(zip(columns, row)) for row in rows]
        return result


    def _import_product_if_not_exist(self, product_data):
        """
        Check if the product exists. If not? Import It!
        """
        try:
            product = store_models.Product.objects.get(
                name=product_data['name'])
        except ObjectDoesNotExist:
            product = store_models.Product(name=product_data['name'])

        product.save()

        # Create / update (default) price
        try:
            price = product.price_set.get(price_set=1)
        except:
            price_set = store_models.PriceSet.objects.get(name='default')
            price = store_models.Price(price_set=price_set,
                                       amount=product_data['price'],
                                       product=product)

        price.save()

        print("[i] Created product: {}".format(product))

    def _import_user_if_not_exists(self, user_data):
        """
        Check if there is a user existing in the
        database, matched by username.
        If not, import the user.
        """
        try:
            mete_user = auth_models.User.objects.get(
                username=user_data['name'])
            print("[i] Updating user: {}".format(user_data['name']))

        except ObjectDoesNotExist:
            print("[i] Creating user: {}".format(user_data['name']))
            # Create new user
            mete_user = auth_models.User(username=user_data['name'])


        # Update userdata
        mete_user.email = user_data['email']
        mete_user.date_joined = user_data['created_at']

        mete_user.save()

        # Update account balance
        account = mete_user.account
        account.balance = user_data['balance']
        account.save()


    def handle(self, *args, **options):
        """
        Manage import
        """
        # Make database connection:
        conn = sqlite3.connect(options['database'])

        # Import Users
        query = """
            SELECT * FROM users 
        """

        cursor = conn.cursor()
        cursor.execute(query)

        users = self._fetch_named_list(cursor)
        for user_data in users:
            self._import_user_if_not_exists(user_data)


        # Import Products
        query = """
            SELECT * FROM drinks
        """

        cursor = conn.cursor()
        cursor.execute(query)

        products = self._fetch_named_list(cursor)
        for product_data in products:
            self._import_product_if_not_exist(product_data)
