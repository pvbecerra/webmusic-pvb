// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // <-- ¡Importaciones correctas!
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import './App.css';

function App() {
  return (
    <Router> {/* <-- Envuelve toda la aplicación */}
      <div className="App">
        <header>
          <h1>Mi Biblioteca Musical</h1>
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/artists">Artistas</Link></li>
              <li><Link to="/albums">Álbumes</Link></li> {/* <-- Este es el enlace a la lista de álbumes */}
            </ul>
          </nav>
        </header>

        <main>
          <Routes> {/* <-- Contenedor de todas las rutas */}
            <Route path="/" element={
              <>
                <h2>Bienvenido a tu Biblioteca!</h2>
                <p>Usa la navegación para explorar tus artistas y álbumes.</p>
              </>
            } />
            <Route path="/artists" element={<ArtistList />} />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/albums/:id" element={<AlbumDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
