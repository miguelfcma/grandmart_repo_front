import { useEffect, useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { CardPublicacionBlog } from "./CardPublicacionBlog";

import "./ListaPublicacionesBlog.css";

export function ListaPublicacionesBlog() {
  const { publicaciones, loadPublicaciones } = usePublicacionesBlog();

  useEffect(() => {
    loadPublicaciones();
  }, []);

  function renderMain() {
    if (publicaciones.length == 0) {
      return <h1>No hay usuarios registrados</h1>;
    } else {
      return publicaciones.map((publicacion) => (
        <CardPublicacionBlog key={publicacion.id} publicacion={publicacion} />
      ));
    }
  }
  return (
    <>
      <div className="list-usuarios">{renderMain()}</div>
    </>
  );
}
