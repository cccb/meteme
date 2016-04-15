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

# Register model admins 
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.PriceSet, PriceSetAdmin)
