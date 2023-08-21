from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, UserDetailSerializer, MyTokenObtainPairSerializer

from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import logout
from django.utils import timezone
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

class Users(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('-last_login')
    serializer_class = UserDetailSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == status.HTTP_200_OK:
            user = self.request.user
            if user and user.is_authenticated:
                user.last_login = timezone.now()
                user.save()
        
        return response

