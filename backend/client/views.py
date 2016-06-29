from django.shortcuts import render, redirect

# Create your views here.

def index(request):
    """ Redirect to static single page app """
    return redirect(to='/static/client/index.html', permanent=True)
