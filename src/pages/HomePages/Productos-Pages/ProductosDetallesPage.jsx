import React from "react";
import { useParams } from "react-router-dom";
import { DetallesProductoGeneral } from "../../../components/ProductoComponents/ProductosGeneral/VistaDetallesProductoGeneral/DetallesProductoGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
import "./ProductosDetallesPage.css"; // Importa el archivo CSS

export function ProductosDetallesPage() {
  const { id } = useParams();
  return (
    <div className="productos-detalles-page">
      <Navbar1 className="navbar" />
      <div className="detalles-producto-general">
        <DetallesProductoGeneral id={id} />
        <FooterHome />
      </div>
    </div>
  );
}
