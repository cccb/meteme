from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import render

from solo.admin import SingletonModelAdmin

from mete import models, forms

class BarcodeAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', '_type', '_target']


    def _target(self, obj):
        """Return name of user account or product"""
        src = obj.product
        if not src:
            src = obj.account
        return str(src)


    def _type(self, obj):
        """Return type of barcode"""
        if obj.product:
            return "Product"
        return "Account"


class UserSettingAdmin(admin.ModelAdmin):
    list_display = ['user']


class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'balance', 'created_at', 'updated_at',
                    'is_locked', 'is_disabled']

    list_display_links = ['id', 'balance', 'user']

    readonly_fields = ['user']

    form = forms.AccountForm


class KeyPairAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'public_key', 'created_at', 'updated_at']
    list_display_links = ['id']


class TransactionAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'amount', 'product']
    list_display_links = []

    def get_actions(self, request):
        """
        Override get actions to get rid of delete
        """
        actions = super(TransactionAdmin, self).get_actions(request)
        del actions['delete_selected']
        return actions


    def changelist_view(self, request, extra_context=None):
        """
        Override changelist view
        """
        transactions = models.Transaction.objects.all()
        accounts = models.Account.objects.all()

        accounts_sum = sum([a.balance for a in accounts])
        transactions_grouped = models.Transaction.objects.grouped_month()

        return render(request, 'admin/transactions.html', {
            "accounts": accounts,
            "accounts_sum": accounts_sum,
            "transactions": transactions,
            "transactions_grouped": transactions_grouped,
        })

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    class Meta:
        verbose_name = 'Matekasse'


class SettingsAdmin(SingletonModelAdmin):
    pass


# Register model admins
admin.site.register(models.Barcode, BarcodeAdmin)
admin.site.register(models.UserSetting, UserSettingAdmin)
admin.site.register(models.Account, AccountAdmin)
admin.site.register(models.KeyPair, KeyPairAdmin)
admin.site.register(models.Transaction, TransactionAdmin)
admin.site.register(models.Settings, SettingsAdmin)
