
from django.conf.urls import url
from client import views


urlpatterns = [
    url(r'', views.index, name='home'),
]

