// src/components/AlbumDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function AlbumDetail() {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumDetail = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/albums/${id}/`);
        setAlbum(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error al cargar el álbum con ID: ${id}. Asegúrate de que el backend esté corriendo y el ID sea válido.`);
        setLoading(false);
        console.error('Error fetching album detail:', err);
      }
    };

    fetchAlbumDetail();
  }, [id]); // El efecto se vuelve a ejecutar si el 'id' de la URL cambia

  if (loading) {
    return <div className="loading">Cargando detalles del álbum...</div>;
  }

  if (error) {
    return <div className="error" style={{ color: 'red' }}>{error}</div>;
  }

  if (!album) {
    return <div className="not-found">Álbum no encontrado.</div>;
  }

  return (
    <div className="album-detail-container">
      <Link to="/albums">← Volver a la lista de álbumes</Link>
      <h2>{album.title}</h2>
      {album.artist && (
        <p>Artista: <strong>{album.artist.name}</strong></p>
      )}
      <p>Fecha de lanzamiento: {album.release_date || 'N/A'}</p>
      <p>Formato: {album.format}</p>
      {album.catalog_number && <p>Número de catálogo: {album.catalog_number}</p>}
      {album.condition && <p>Condición: {album.condition}</p>}
      {album.location && <p>Ubicación: {album.location}</p>}
      {album.notes && <p>Notas: {album.notes}</p>}

      {album.cover_image && (
        <div className="album-cover">
          {/* Asegúrate que tu MEDIA_URL en Django settings esté configurado correctamente */}
          <img src={album.cover_image} alt={`Portada de ${album.title}`} style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
      )}

      <h3>Pistas:</h3>
      {album.tracks && album.tracks.length > 0 ? (
        <ol className="track-list">
          {album.tracks.map(track => (
            <li key={track.id}>
              {track.track_number}. {track.title} {track.duration ? `(${track.duration})` : ''}
            </li>
          ))}
        </ol>
      ) : (
        <p>No hay pistas registradas para este álbum.</p>
      )}
    </div>
  );
}

export default AlbumDetail;
