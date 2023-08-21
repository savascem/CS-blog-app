from django.urls import path, re_path
from . import views

urlpatterns = [
    path('post/', views.AllPostList.as_view(), name='postlist'),
    path('post/<int:pk>/', views.PostDetail.as_view(), name='postdetail'),
    re_path('^post/user/(?P<creator>.+)/$', views.PostList.as_view()),
    re_path('^post/category/(?P<category>.+)/$', views.CategoryPostList.as_view()),
]