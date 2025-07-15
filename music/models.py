# music/models.py

from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=200, unique=True)
    biography = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Album(models.Model):
    FORMAT_CHOICES = [
        ('VINYL', 'Vinilo'),
        ('CD', 'CD'),
        ('DIGITAL', 'Digital'), # Podrías querer incluir esto también
    ]

    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='albums')
    release_date = models.DateField(blank=True, null=True, help_text="Fecha de lanzamiento (YYYY-MM-DD)")
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES, default='VINYL')
    catalog_number = models.CharField(max_length=100, blank=True, null=True)
    condition = models.CharField(max_length=50, blank=True, null=True, help_text="Ej: VG+, NM, Mint")
    location = models.CharField(max_length=255, blank=True, null=True, help_text="Ej: Estante 3, Caja de CDs")
    cover_image = models.ImageField(upload_to='covers/', blank=True, null=True) # Necesitarás Pillow: pip install Pillow
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Esto asegura que no tengas dos álbumes idénticos (mismo título, mismo artista, mismo año)
        unique_together = ('title', 'artist', 'release_date')

    def __str__(self):
        # Asegúrate de manejar el caso donde release_date podría ser None
        # Puedes simplificarlo o hacerlo más robusto
        if self.release_date:
            release_info = f" ({self.release_date.year})"
        else:
            release_info = "" # No muestra nada si la fecha es nula
        return f"{self.title} - {self.artist.name}{release_info}"

class Track(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='tracks')
    title = models.CharField(max_length=255)
    track_number = models.IntegerField()
    duration = models.DurationField(blank=True, null=True) # Formato hh:mm:ss

    class Meta:
        unique_together = ('album', 'track_number')
        ordering = ['track_number'] # Ordenar por número de pista por defecto

    def __str__(self):
        return f"{self.track_number}. {self.title}"

# Puedes añadir más modelos si lo necesitas, como Géneros o Sellos Discográficos
# class Genre(models.Model):
#     name = models.CharField(max_length=100, unique=True)
#     def __str__(self):
#         return self.name

# class Label(models.Model):
#     name = models.CharField(max_length=200, unique=True)
#     def __str__(self):
#         return self.name

# Y luego, en Album:
#    genres = models.ManyToManyField(Genre, blank=True)
#    label = models.ForeignKey(Label, on_delete=models.SET_NULL, null=True, blank=True)
