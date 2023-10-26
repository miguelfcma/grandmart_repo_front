import { ListServiciosGeneral } from "../../../components/ServicioComponents/ServiciosGeneral/ListaGeneralServicios/ListServiciosGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
// Definición del componente ServiciosPage
export function ServiciosPage() {
  // Definición del estado searchTerm y su función para actualizarlo
  const [searchTerm, setSearchTerm] = useState("");

  // Función handleSearch que actualiza el estado searchTerm
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Renderiza el componente Navbar1 y pasa la función handleSearch como prop */}
      <Navbar1 onSearch={handleSearch} />

      {/* Comprueba si hay un término de búsqueda y renderiza el componente de filtrado de productos si searchTerm está presente */}
      {searchTerm ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          {/* Muestra un mensaje y la lista de servicios generales si no hay un término de búsqueda */}
          <div
            style={{ fontSize: "30px", paddingTop: "1px", marginLeft: "38px" }}
          >
            Estás en la categoría de "Servicios".
          </div>
          <div style={{ paddingLeft: "30px", paddingRight: "45px" }}>
            <ListServiciosGeneral />
          </div>
        </>
      )}

      {/* Renderiza el componente FooterHome al final de la página */}
      <FooterHome />
    </div>
  );
}
