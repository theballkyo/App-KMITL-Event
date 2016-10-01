from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return HttpResponse('<h1>Hello, World</h1>')

def login(request):
    if request.POST:
        pass
        
    return render(request, 'login.html')