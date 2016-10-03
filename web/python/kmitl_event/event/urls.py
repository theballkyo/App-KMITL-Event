from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'create/$', views.create),

    # Method GET=view, PUT=update, DELETE=delete
    url(r'(?P<event_id>[0-9]+)$', views.EventView.as_view()),
]