// src/components/AlbumList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de que Link esté importado

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/albums/`);
        setAlbums(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los álbumes. Asegúrate de que el backend esté corriendo.');
        setLoading(false);
        console.error('Error fetching albums:', err);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return <div className="loading">Cargando álbumes...</div>;
  }

  if (error) {
    return <div className="error" style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="album-list-container">
      <h2>Álbumes</h2>
      {albums.length === 0 ? (
        <p>No hay álbumes en tu biblioteca. ¡Añade algunos desde el admin de Django!</p>
      ) : (
        <ul className="album-list">
          {albums.map(album => (
            <li key={album.id} className="album-item">
              {/* ¡Aquí es crucial! Asegúrate de que album.id exista y sea un valor numérico */}
              <Link to={`/albums/${album.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{album.title}</h3>
                <p>Artista: {album.artist ? album.artist.name : 'Desconocido'}</p>
                <p>Año: {album.release_date ? new Date(album.release_date).getFullYear() : 'N/A'}</p>
                <p>Formato: {album.format}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AlbumList;
