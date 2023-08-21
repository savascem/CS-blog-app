from django.shortcuts import render
from rest_framework import generics
from .serializers import UserProfileSerializer
from .models import UserProfile


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'user_id'


class UsersProfile(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
