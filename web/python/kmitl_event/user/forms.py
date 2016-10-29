from django import forms

class LoginForm(forms.Form):
    email = forms.EmailField(max_length=128)
    password = forms.CharField(min_length=6, max_length=32)
    
class RegisterForm(forms.Form):
    email = forms.EmailField(max_length=128)
    password = forms.CharField(min_length=6, max_length=32)