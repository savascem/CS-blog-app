from rest_framework import generics, viewsets
from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def get_queryset(self):
        creator_id = self.kwargs['creator']
        creator_posts = Post.objects.filter(creator_id=creator_id).order_by('-created_at')
        return creator_posts
    

class AllPostList(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer


class CategoryPostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        category = Post.objects.filter(category=category).order_by('-created_at')
        return category


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

