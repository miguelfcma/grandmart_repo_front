import React from "react";

export function Publicaciones() {
  const publicaciones = [
    {
      id: 1,
      titulo: "Publicación 1",
      descripcion: "Descripción de la publicación 1",
      imagen: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      titulo: "Publicación 2",
      descripcion: "Descripción de la publicación 2",
      imagen: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      titulo: "Publicación 3",
      descripcion: "Descripción de la publicación 3",
      imagen: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      {publicaciones.map((publicacion) => (
        <div key={publicacion.id}>
          <h3>{publicacion.titulo}</h3>
          <p>{publicacion.descripcion}</p>
          <img src={publicacion.imagen} alt={publicacion.titulo} />
        </div>
      ))}
    </div>
  );
}

export default Publicaciones;
