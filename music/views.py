# music/views.py

from rest_framework import viewsets
from .models import Artist, Album, Track
from .serializers import ArtistSerializer, AlbumSerializer, TrackSerializer

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all().order_by('name') # Ordena por nombre por defecto
    serializer_class = ArtistSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all().select_related('artist').prefetch_related('tracks').order_by('-release_date', 'title')
    serializer_class = AlbumSerializer

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all().order_by('album__title', 'track_number')
    serializer_class = TrackSerializer
