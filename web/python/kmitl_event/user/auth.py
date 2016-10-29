from .models import User
from django.contrib.auth.hashers import make_password, check_password

class Auth(object):
    def authenticate(self, email=None, password=None):
        try:
            user = User.objects.filter(email=email).first()
            if user is not None:
                if check_password(password, user.password):
                    return user
            return None 
        except User.DoesNotExist:
            return None
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None