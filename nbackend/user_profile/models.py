from django.db import models
from accounts.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    first_name = models.CharField(max_length=15, blank=True)
    last_name = models.CharField(max_length=15, blank=True)
    country = models.CharField(max_length=25, blank=True)
    education = models.CharField(max_length=25, blank=True)
    profile_picture = models.ImageField(blank=True, upload_to='user/picture')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

