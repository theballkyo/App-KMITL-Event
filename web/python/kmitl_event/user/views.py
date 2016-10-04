from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test

from .forms import LoginForm

def check_is_admin(user):
    return user.is_admin()

# Create your views here.
def home(request):
    return HttpResponse('<h1>Hello, World</h1>')

def login_user(request):
    if request.user.is_authenticated:
        return HttpResponse("You are logged.")

    if request.POST:
        if LoginForm(request.POST).is_valid():
            data = request.POST
            user = authenticate(
                email=data.get('email'),
                password=data.get('password')
            )

            if user is not None:
                login(request, user)
                return redirect('/event')
    return render(request, 'login.html')

def logout_user(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('/user/login')

@login_required(redirect_field_name='')
@user_passes_test(check_is_admin)
def register_user(request):
    return HttpResponse("Hello")
