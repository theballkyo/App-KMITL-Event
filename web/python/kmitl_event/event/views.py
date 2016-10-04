from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View

from .forms import CreateEventForm
# Create your views here.
def home(request):
    return render(request, 'event/home.html')

def create(request):
        if request.POST:
            # Create a event
            form = CreateEventForm(request)
            if form.is_valid():
                pass
            pass
        return render(request, "event/create.html")

class EventView(LoginRequiredMixin, View):
    redirect_field_name = ''

    def get(self, request, event_id):
        return self.show_event(request, event_id)
    
    def post(self, request, event_id):
        if request.PUT:
            return self.update_event(request, event_id)
        elif request.DELETE:
            return self.delete_event(request, event_id)
        
    def show_event(self, request, event_id):
        return HttpResponse("Event id: " + event_id)

    def update_event(self, request, event_id):
        pass

    def delete_event(self, request, event_id):
        pass