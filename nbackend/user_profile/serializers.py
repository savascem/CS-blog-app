from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    class Meta:
        model = UserProfile
        fields = ('id', 'first_name', 'last_name', 'country', 'education', 'profile_picture', 'user_id')