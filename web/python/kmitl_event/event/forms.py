from django.forms import ModelForm
from .models import Event
class CreateEventForm(ModelForm):
    # tags = forms.TextField(max_length=400)

    class Meta:
        model = Event
        fields = ['name', 'description', 'start_at', 'end_at', 'contact_other'
                 ,'contact_email', 'contact_phone', 'cost', 'tags']