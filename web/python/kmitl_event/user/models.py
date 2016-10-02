from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField()
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    password = models.CharField(max_length=128)
    role = models.IntegerField()
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    USER_ROLES = {
        'admin': 0,
        'manager': 1,
        'normal': 2,
    }

    def get_full_name(self):
        # The user is identified by their email address
        return self.first_name, self.last_name

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):              # __unicode__ on Python 2
        return self.email

    def is_admin(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.role == self.USER_ROLES['admin']

    class Meta:
        db_table = 'users'
        