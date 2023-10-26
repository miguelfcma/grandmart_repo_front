// Importación de los módulos necesarios desde rutas específicas
import { InfoContacto } from "../../../components/HomePageComponents/InfoContacto";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";

// Definición del componente ContactoPage
export function ContactoPage() {
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

      {/* Comprueba si hay un término de búsqueda y renderiza el componente de filtrado de productos por búsqueda si searchTerm está presente */}
      {searchTerm ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          {/* Muestra el componente InfoContacto que probablemente contiene información de contacto */}
          <InfoContacto />
        </>
      )}

      {/* Renderiza el componente FooterHome al final de la página */}
      <FooterHome />
    </div>
  );
}
