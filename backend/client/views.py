from django.shortcuts import render, redirect

# Create your views here.

def index(request):
    return redirect(to='/static/client/index.html', permanent=True)
