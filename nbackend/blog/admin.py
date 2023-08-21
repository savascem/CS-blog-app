from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    list_display = ['title', 'creator', 'category', 'created_at']
    list_editable = ['category']

admin.site.register(Post, PostAdmin)
