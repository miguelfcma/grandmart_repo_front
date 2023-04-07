import React, { useState } from 'react';
import { useBlog } from './BlogContext/BlogProvider';

export function NuevaPublicacionBlog() {
  const {  createPublicacion  } = useBlog();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const publicacion = { titulo, contenido };
    const success = await createPublicacion(publicacion);
    if (success) {
      setTitulo('');
      setContenido('');
      alert('Publicación creada exitosamente');
    } else {
      alert('Hubo un error al crear la publicación');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </label>
      <br />
      <label>
        Contenido:
        <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} />
      </label>
      <br />
      <button type="submit">Crear publicación</button>
    </form>
  );
}
