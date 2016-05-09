from django.contrib import admin
import models

class ProductPriceInline(admin.StackedInline):
    model = models.Price
    extra = 0


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'name', 'price', 'active'
    ]

    list_display_links = ['id', 'name']

    inlines = [
        ProductPriceInline,
    ]


class PriceSetAdmin(admin.ModelAdmin):
    pass


# Register model admins 
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.PriceSet, PriceSetAdmin)
