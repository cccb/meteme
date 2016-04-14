from django.contrib import admin
import models

class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'balance', 'created_at',
                    'updated_at']

class KeyPairAdmin(admin.ModelAdmin):
    list_display = ['id', 'account', 'public_key', 'created_at', 'updated_at']

# Register model admins
admin.site.register(models.Account, AccountAdmin)
admin.site.register(models.KeyPair, KeyPairAdmin)

