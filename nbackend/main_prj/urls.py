from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/', include('accounts.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/profile/', include('user_profile.urls')),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
