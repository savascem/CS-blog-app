from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('^(?P<user_id>.+)/$', views.UserProfileView.as_view(), name='user_profile'),
]