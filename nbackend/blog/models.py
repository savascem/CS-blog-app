from django.db import models
from accounts.models import User


class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=20)
    title = models.CharField(max_length=250, blank=False)
    post = models.TextField(max_length=10000, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
