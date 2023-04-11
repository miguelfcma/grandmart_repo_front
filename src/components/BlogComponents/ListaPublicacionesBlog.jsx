import { useEffect, useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { ListaComentariosPublicacionBlog } from "./ListaComentariosPublicacionBlog";
import { FormComentarioPublicacionBlog } from "./FormComentarioPublicacionBlog";
import "./ListaPublicacionesBlog.css";

export function ListaPublicacionesBlog() {
  const { publicaciones, loadPublicaciones } = usePublicacionesBlog();

  useEffect(() => {
    loadPublicaciones();
  }, []);

  return (
    <div className="blog-container">
      {publicaciones.length > 0 ? (
        publicaciones.map((publicacion) => (
          <div key={publicacion.id} className="publicacion">
            <h3>id: {publicacion.id} Titulo:{publicacion.titulo}</h3>
            <h4>Publicación por: {publicacion.usuario.nombre}</h4>
            <h4>
              Fecha de publicación:{" "}
              {new Date(publicacion.updatedAt).toLocaleDateString()}
            </h4>
            <p>{publicacion.descripcion}</p>
            <h4>Comentarios: </h4>
            <p></p>
            <ListaComentariosPublicacionBlog
              id_publicacionBlog={publicacion.id}
            />
            
          </div>
        ))
      ) : (
        <p>No hay publicaciones.</p>
      )}
    </div>
  );
}
