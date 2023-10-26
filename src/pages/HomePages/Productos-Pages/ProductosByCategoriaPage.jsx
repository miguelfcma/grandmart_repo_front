// Importación de los módulos necesarios desde rutas específicas
import { useParams } from "react-router-dom";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosGeneral } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosGeneral";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";

// Definición del componente ProductosByCategoriaPage
export function ProductosByCategoriaPage() {
  // Obtención de parámetros de la URL, en este caso, 'id_categoria' y 'nombre_categoria'
  const { id_categoria, nombre_categoria } = useParams();

  // Definición del estado searchTerm y su función para actualizarlo
  const [searchTerm, setSearchTerm] = useState("");

  // Función handleSearch que actualiza el estado searchTerm
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <div style={{ paddingTop: "80px" }}>
        {/* Renderiza el componente Navbar1 y pasa la función handleSearch como prop */}
        <Navbar1 onSearch={handleSearch} />

        {/* Comprueba si hay un término de búsqueda y renderiza el componente de filtrado de productos por búsqueda si searchTerm está presente */}
        {searchTerm ? (
          <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
        ) : (
          <>
            {" "}
            {/* Renderiza el componente de filtrado de productos por categoría y pasa 'id_categoria' y 'nombre_categoria' como propiedades */}
            <FiltradoProductosGeneral
              id_categoria={id_categoria}
              nombre_categoria={nombre_categoria}
            />
          </>
        )}
      </div>

      {/* Renderiza el componente FooterHome al final de la página */}
      <FooterHome />
    </>
  );
}
