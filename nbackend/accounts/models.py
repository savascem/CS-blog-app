from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from datetime import date


class User(AbstractUser):
    username = models.CharField(max_length = 50, blank = True, null = True, unique = True)
    email = models.EmailField(unique = True)
    superuser_status = models.BooleanField(default=False) 
    active = models.BooleanField(default=True)
    last_login = models.DateTimeField(auto_now=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    def __str__(self):
        return self.email
    

