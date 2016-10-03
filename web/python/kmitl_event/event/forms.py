from django import forms

class CreateEventForm(forms.Form):
    name = forms.CharField(max_length=255)
    description = forms.TextField(max_length=4000)
    start_at = forms.DateTimeField()
    end_at = forms.DateTimeField()
    contact_other = forms.TextField(max_length=1024)
    contact_email = forms.EmailField()
    contact_phone = forms.CharField(max_length=255)
    # Default = 0 is Free event
    cost = forms.IntegerField(default=0)