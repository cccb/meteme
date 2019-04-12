
import os

from django.http.response import HttpResponse
from django.shortcuts import redirect

# Create your views here.

def index(request):
    """ Redirect to static single page app """
    # Render static index
    index_filename = os.path.join(os.path.dirname(__file__),
        "static", "webshit", "index.html")

    with open(index_filename, "r") as f:
        content = f.read()

    return HttpResponse(content)
