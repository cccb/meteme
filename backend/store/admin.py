from django.contrib import admin

from store import models


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['id', 'name']


class ProductPriceInline(admin.StackedInline):
    model = models.Price
    extra = 0


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'name', 'price', 'active', '_categories'
    ]

    list_display_links = ['id', 'name']

    inlines = [
        ProductPriceInline,
    ]


    def _categories(self, obj):
        return ", ".join([str(c) for c in obj.categories.all()])


class PriceSetAdmin(admin.ModelAdmin):
    pass


# Register model admins 
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.PriceSet, PriceSetAdmin)
