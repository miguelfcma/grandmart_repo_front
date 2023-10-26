// Importación de los módulos necesarios desde rutas específicas
import { CarritoPay } from "../../../components/CarritoComponents/CarritoPay";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";

// Importación de useState para gestionar el estado
import { useState } from "react";

// Definición del componente CompraCarritoPage
export function CompraCarritoPage() {
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
          
          {/* Muestra el componente CarritoPay, que probablemente representa la página de pago del carrito de compras */}
          <CarritoPay />
        </>
      )}

      {/* Renderiza el componente FooterHome al final de la página */}
      <FooterHome />
    </div>
  );
}
