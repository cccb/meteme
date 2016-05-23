from django.contrib import admin
from solo.admin import SingletonModelAdmin

import models

class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'balance', 'created_at', 'updated_at',
                    'is_locked', 'is_disabled']

    list_display_links = ['id', 'balance', 'user']

    readonly_fields = ['user']

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


    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class SettingsAdmin(SingletonModelAdmin):

    def __unicode__(self):
        return 'Mete98 (ME) Configuration'

    class Meta:
        verbose_name = 'Mete98 (ME) Configuration'


# Register model admins
admin.site.register(models.Account, AccountAdmin)
admin.site.register(models.KeyPair, KeyPairAdmin)
admin.site.register(models.Transaction, TransactionAdmin)
admin.site.register(models.Settings, SettingsAdmin)
