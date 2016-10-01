from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField()
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    password = models.CharField(max_length=128)
    role = models.IntegerField()
    last_login = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'