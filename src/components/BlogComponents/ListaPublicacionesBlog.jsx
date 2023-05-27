import { useEffect, useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { CardPublicacionBlog } from "./CardPublicacionBlog";

import "./ListaPublicacionesBlog.css";

export function ListaPublicacionesBlog() {
  const { publicaciones, loadPublicaciones } = usePublicacionesBlog();
  const [filtro, setFiltro] = useState("");
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);

  useEffect(() => {
    loadPublicaciones();
  }, []);

  useEffect(() => {
    const filtradas = publicaciones.filter(publicacion =>
      Object.values(publicacion).some(valor =>
        typeof valor === "string" && valor.toLowerCase().includes(filtro.toLowerCase())
      )
    );
    setPublicacionesFiltradas(filtradas);
  }, [publicaciones, filtro]);

  function renderMain() {
    if (publicacionesFiltradas.length === 0) {
      return <h1>No hay publicaciones disponibles</h1>;
    } else {
      return publicacionesFiltradas.map(publicacion => (
        <CardPublicacionBlog key={publicacion.id} publicacion={publicacion} />
      ));
    }
  }

  const handleBuscar = event => {
    setFiltro(event.target.value);
  };

  return (
    <div className="blog-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar publicaciones"
          value={filtro}
          onChange={handleBuscar}
        />
      </div>
      <div className="publicaciones-grid">
        {renderMain()}
      </div>
    </div>
  );
}
