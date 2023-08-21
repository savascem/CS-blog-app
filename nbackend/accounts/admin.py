from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('password', 'last_login', 'date_joined')
    list_display = ['email', 'username', 'superuser_status', 'active', 'last_login']
    list_editable = ['superuser_status', 'active']

admin.site.register(User, UserAdmin)