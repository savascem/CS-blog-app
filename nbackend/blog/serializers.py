from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    creator_username = serializers.ReadOnlyField(source='creator.username')
    creator_id = serializers.ReadOnlyField(source='creator.id')
    class Meta:
        model = Post
        fields = '__all__'
