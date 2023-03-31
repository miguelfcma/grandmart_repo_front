
import React, { useState } from "react";
export  function NuevaPublicacion() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    id_usuario: usuario ? usuario.id : null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se pueden hacer las acciones necesarias para registrar la nueva publicación
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPublicacion((prevState) => ({
      ...prevState,
      [name]: value,
      id_usuario: usuario ? usuario.id : null,
    }));
  };

  return (
    <>
      {usuario ? (
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              value={publicacion.titulo}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={publicacion.descripcion}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Crear publicación</button>
        </form>
      ) : (
        <p>Inicia sesión para hacer una publicación</p>
      )}
    </>
  );
}