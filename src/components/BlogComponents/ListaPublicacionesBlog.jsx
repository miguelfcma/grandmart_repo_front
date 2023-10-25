//Este archivo muestra la lista de publicaciones en el blog, permite a los usuarios buscar publicaciones por su titulo o contenido 

import { useEffect, useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { CardPublicacionBlog } from "./CardPublicacionBlog";
import "./ListaPublicacionesBlog.css";

export function ListaPublicacionesBlog() {
  const { publicaciones, loadPublicaciones } = usePublicacionesBlog();
  //Se utiliza el hook useState, incluye "filtro" de cadena de texto que se utiliza para filtrar las publicaciones que se busquen
  const [filtro, setFiltro] = useState("");
  //Es un arreglo que almacenara las publicaciones filtradas si coinciden con la busqueda
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);

  //El hook useEffect funciona para cargar las publicaciones por primera vez desde el contexto usePublicacionesBlog
  useEffect(() => {
    loadPublicaciones();
  }, []);

  //el siguiente hook controla el filtrado de las publicaciones en funcion del valor filtro y las actualiza en publicacionesFiltradas
  useEffect(() => {
    //Utiliza el metodo filter, en funcion del titulo o descripcion
    const filtradas = publicaciones.filter(publicacion =>
      Object.values(publicacion).some(valor =>
        typeof valor === "string" && valor.toLowerCase().includes(filtro.toLowerCase())
        //acepta mayusculas o minusculas
      )
    );
    setPublicacionesFiltradas(filtradas);
  }, [publicaciones, filtro]);

  //Renderiza o muestra las publicaciones filtradas, se crea una lista y si no hay ninguna publicacion que coincida muestra un mensaje de que no existen
  function renderMain() {
    if (publicacionesFiltradas.length === 0) {
      return <h1>No hay publicaciones disponibles</h1>;
    } else {
      //se crea una lista de elementos CardPublicacionBlog para cada componente, recibe una prop "publicacion" que contiene la informacion de la publicacion
      return publicacionesFiltradas.map(publicacion => (
        <CardPublicacionBlog key={publicacion.id} publicacion={publicacion} />
      ));
    }
  }
  //La funcion handleBuscar controla el estado de "filtro" que se actualiza cada vez que el usuario escriba en el campo de texto de entrada
  const handleBuscar = event => {
    setFiltro(event.target.value);
  };

  //Renderizado del componente principal, renderiza una barra de busqueda con un campo de texto del usuario
  return (
    <div className="blog-container">
      <div className="search-bar">
        {/*Cuando el usuario escribe el estado "filtro" se actualiza, y activa el segundo useEffect que filtra las publicaciones*/}
        <input
          type="text"
          placeholder="Buscar publicaciones"
          value={filtro}
          onChange={handleBuscar}
        />
      </div>
      {/*Las publicaciones filtradas se muestran debajo del contenedor de busqueda */}
      <div className="publicaciones-grid">
        {renderMain()}
      </div>
    </div>
  );
}
