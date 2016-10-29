from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'login', views.login_user),
    url(r'logout', views.logout_user),
    url(r'register/$', views.register_user)
]