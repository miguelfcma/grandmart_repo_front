// Importación de los módulos necesarios desde rutas específicas
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FormNuevaPublicacionBlog } from "../../../components/BlogComponents/FormNuevaPublicacionBlog";
import { ListaPublicacionesBlog } from "../../../components/BlogComponents/ListaPublicacionesBlog";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";

// Definición del componente BlogPage
export function BlogPage() {
  // Definición del estado searchTerm y su función para actualizarlo
  const [searchTerm, setSearchTerm] = useState("");

  // Función handleSearch que actualiza el estado searchTerm
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Obtiene la información del usuario desde el almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Renderiza el componente Navbar1 y pasa la función handleSearch como prop */}
      <Navbar1 onSearch={handleSearch} />

      {/* Comprueba si hay un término de búsqueda y renderiza el componente de filtrado de productos por búsqueda si searchTerm está presente */}
      {searchTerm ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          {/* Comprueba si el usuario está autenticado y muestra el formulario de nueva publicación si es así, de lo contrario muestra un mensaje */}
          {usuario ? (
            <FormNuevaPublicacionBlog />
          ) : (
            <p>Por favor inicia sesión para publicar</p>
          )}

          {/* Muestra la lista de publicaciones del blog */}
          <ListaPublicacionesBlog />
        </>
      )}

      {/* Renderiza el componente FooterHome al final de la página */}
      <FooterHome />
    </div>
  );
}
