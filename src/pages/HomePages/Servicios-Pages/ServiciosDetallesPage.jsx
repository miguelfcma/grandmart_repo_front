import { useParams } from "react-router-dom";
import { DetallesServicioGeneral } from "../../../components/ServicioComponents/ServiciosGeneral/ListaGeneralServicios/VistaDetallesServicioGeneral/DetallesServicioGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";

// Definición del componente ServiciosDetallesPage
export function ServiciosDetallesPage() {
  // Obtención de parámetros de la URL, en este caso, 'id'
  const { id } = useParams();

  // Definición del estado searchTerm y su función para actualizarlo
  const [searchTerm, setSearchTerm] = useState("");

  // Función handleSearch que actualiza el estado searchTerm
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div style={{ paddingTop: "80px" }} className="productos-detalles-page">
      {/* Renderiza el componente Navbar1 y pasa la función handleSearch como prop */}
      <Navbar1 onSearch={handleSearch} className="navbar" />

      {/* Comprueba si hay un término de búsqueda y renderiza el componente de filtrado de productos si searchTerm está presente */}
      {searchTerm ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          {/* Muestra el componente DetallesServicioGeneral con el 'id' obtenido de los parámetros de la URL */}
          <div className="detalles-producto-general">
            <DetallesServicioGeneral id={id} />
          </div>
        </>
      )}

      {/* Renderiza el componente FooterHome al final de la página */}
      <FooterHome />
    </div>
  );
}
