"""
URL configuration for mi_biblioteca_musical project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from music import views # Importa tus vistas

# Crea un router para registrar tus ViewSets
router = DefaultRouter()
router.register(r'artists', views.ArtistViewSet)
router.register(r'albums', views.AlbumViewSet)
router.register(r'tracks', views.TrackViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), # Incluye las URLs de tu API
    # Si vas a servir archivos estáticos/media (como imágenes de portada)
    # en desarrollo, añade esto:
    # path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
    # path('static/<path:path>', serve, {'document_root': settings.STATIC_ROOT}),
]

# Configuración para servir archivos multimedia en desarrollo
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
