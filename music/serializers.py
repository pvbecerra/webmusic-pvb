from rest_framework import serializers
from .models import Artist, Album, Track

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__' # Incluye todos los campos del modelo Artist

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__' # Incluye todos los campos del modelo Track

class AlbumSerializer(serializers.ModelSerializer):
    # Para que cuando listes álbumes, veas los detalles del artista y las canciones
    artist = ArtistSerializer(read_only=True)
    tracks = TrackSerializer(many=True, read_only=True)

    # Si quieres poder crear/actualizar álbumes enviando solo el ID del artista
    # Usa 'write_only=True' para que no se duplique la información en la lectura
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(), source='artist', write_only=True
    )

    class Meta:
        model = Album
        fields = [
            'id', 'title', 'artist', 'artist_id', 'release_date', 'format',
            'catalog_number', 'condition', 'location', 'cover_image',
            'notes', 'created_at', 'updated_at', 'tracks'
        ]
        read_only_fields = ['created_at', 'updated_at'] # Estos campos se manejan automáticamente
