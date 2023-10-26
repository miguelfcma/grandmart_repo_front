// Importación del módulo React y los módulos necesarios desde rutas específicas
import React from "react";
import { useParams } from "react-router-dom";
import { DetallesProductoGeneral } from "../../../components/ProductoComponents/ProductosGeneral/VistaDetallesProductoGeneral/DetallesProductoGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
import "./ProductosDetallesPage.css"; // Importa el archivo CSS
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useProductos } from "../../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useState } from "react";

// Definición del componente ProductosDetallesPage
export function ProductosDetallesPage() {
  // Obtención de funciones y estados desde el contexto de productos
  const { agregarTerminoBusqueda, terminoBusqueda } = useProductos();

  // Obtención del parámetro 'id' de la URL
  const { id } = useParams();

  // Definición del estado searchTerm y su función para actualizarlo
  const [searchTerm, setSearchTerm] = useState("");

  // Manejo de la búsqueda y actualización del término de búsqueda en el contexto de productos
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    agregarTerminoBusqueda(searchTerm);
  };

  return (
    <div style={{ paddingTop: "80px" }} className="productos-detalles-page">
      {/* Renderiza el componente Navbar1 y pasa la función handleSearch como prop */}
      <Navbar1 onSearch={handleSearch} className="navbar" />

      {/* Comprueba si hay un término de búsqueda en el contexto y renderiza el componente de filtrado de productos si terminoBusqueda está presente */}
      {terminoBusqueda ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          {" "}
          {/* Muestra el componente DetallesProductoGeneral con el 'id' obtenido de los parámetros de la URL */}
          <div className="detalles-producto-general">
            <DetallesProductoGeneral id={id} />
          </div>
        </>
      )}

      {/* Renderiza el componente FooterHome al final de la página */}
      <FooterHome />
    </div>
  );
}
