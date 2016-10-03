from django.db import models
from user.models import User
# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=255)
    tag_type = models.IntegerField()

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=4000)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    contact_other = models.TextField(max_length=1024)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=255)
    # Default = 0 is Free event
    cost = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag)

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Image(models.Model):
    name = models.CharField(max_length=255, default='')
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
