
from django.conf.urls import url, include

from store.api import router

urlpatterns = [
    url('/', include(router.urls)),
]



