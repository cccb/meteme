
from django.conf.urls import url, include

from api.v1 import views

urlpatterns = [
    url('', include(views.router.urls)),
]

