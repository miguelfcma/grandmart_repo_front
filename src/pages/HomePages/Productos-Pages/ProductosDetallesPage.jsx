import React from "react";
import { useParams } from "react-router-dom";
import { DetallesProductoGeneral } from "../../../components/ProductoComponents/ProductosGeneral/VistaDetallesProductoGeneral/DetallesProductoGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
import "./ProductosDetallesPage.css"; // Importa el archivo CSS
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useProductos } from "../../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useState } from "react";
export function ProductosDetallesPage() {
  const { agregarTerminoBusqueda, terminoBusqueda } = useProductos();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
console.log(terminoBusqueda)
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    agregarTerminoBusqueda(searchTerm);

  };
  return (
    <div style={{ paddingTop: "80px" }} className="productos-detalles-page">
      <Navbar1 onSearch={handleSearch} className="navbar" />
      {terminoBusqueda ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          {" "}
          <div className="detalles-producto-general">
            <DetallesProductoGeneral id={id} />
          </div>
        </>
      )}

      <FooterHome />
    </div>
  );
}
