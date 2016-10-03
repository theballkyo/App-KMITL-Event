from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
@login_required(redirect_field_name='')
def home(request):
    return HttpResponse("This is event/home")

@login_required(redirect_field_name='')
def create(request):
    if request.POST:
        # Create a event
        pass
    return render(request, "event/create.html")

@login_required(redirect_field_name='')
def do_event(request, event_id):
    if request.PUT:
        update_event(request, event_id)
    elif request.DELETE:
        delete_event(request, event_id)
    else:
        show_event(request, event_id)

def show_event(request, event_id):
    return HttpResponse("Event id: " + event_id)

def update_event(request, event_id):
    pass

def delete_event(request, event_id):
    pass