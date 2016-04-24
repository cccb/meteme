from django.contrib import admin
import models

class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'balance', 'created_at',
                    'updated_at']

    list_display_links = ['id', 'name']

class KeyPairAdmin(admin.ModelAdmin):
    list_display = ['id', 'account', 'public_key', 'created_at', 'updated_at']
    list_display_links = ['id', 'account']


class TransactionAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'amount']
    list_display_links = []

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

class SettingsAdmin(admin.ModelAdmin):
    pass


# Register model admins
admin.site.register(models.Account, AccountAdmin)
admin.site.register(models.KeyPair, KeyPairAdmin)
admin.site.register(models.Transaction, TransactionAdmin)
