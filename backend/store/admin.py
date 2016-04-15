from django.contrib import admin
import models

class ProductPriceInline(admin.StackedInline):
    model = models.Price
    extra = 0


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'name', 'get_price', 'active'
    ]

    list_display_links = ['id', 'name']

    inlines = [
        ProductPriceInline,
    ]

    def get_price(self, product):
        return product.default_price

    get_price.__name__ = 'Price (default)'


class PriceSetAdmin(admin.ModelAdmin):
    pass


class LogsAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'product_name', 'product_amount']
    list_display_links = []

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

# Register model admins 
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.PriceSet, PriceSetAdmin)
admin.site.register(models.Log, LogsAdmin)
