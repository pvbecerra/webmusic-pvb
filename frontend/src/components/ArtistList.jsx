import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/artists/`);
        setArtists(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los artistas. Asegúrate de que el backend esté corriendo.');
        setLoading(false);
        console.error('Error fetching artists:', err);
      }
    };
    fetchArtists();
  }, []);

  if (loading) {
    return <div className="loading">Cargando artistas...</div>;
  }

  if (error) {
    return <div className="error" style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="artist-list-container">
      <h2>Artistas</h2>
      {artists.length === 0 ? (
        <p>No hay artistas en tu biblioteca. ¡Añade algunos desde el admin de Django!</p>
      ) : (
        <ul className="artist-list">
          {artists.map(artist => (
            <li key={artist.id} className="artist-item">
              {artist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArtistList;
