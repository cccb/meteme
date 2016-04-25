
from django.conf.urls import url, include

from api import views

urlpatterns = [
    url('', include(views.router.urls)),
]
