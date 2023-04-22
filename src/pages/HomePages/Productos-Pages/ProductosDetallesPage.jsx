import React from "react";
import { useParams } from "react-router-dom";
import { DetallesProductoGeneral } from "../../../components/ProductoComponents/ProductosGeneral/VistaDetallesProductoGeneral/DetallesProductoGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { CardProductoOpcionesGeneral } from "../../../components/ProductoComponents/ProductosGeneral/CardProductoOpcionesGeneral/CardProductoOpcionesGeneral";
import "./ProductosDetallesPage.css"; // Importa el archivo CSS
import { PreguntasProductoComponenteCompletoGeneral } from "../../../components/ProductoComponents/ProductosGeneral/PreguntasProductoGeneral/PreguntasProductoComponenteCompletoGeneral";
export function ProductosDetallesPage() {
  const { id } = useParams();
  return (
    <div className="productos-detalles-page"> {/* Aplica la clase de estilo al contenedor principal */}
      <Navbar1 className="navbar" /> {/* Aplica la clase de estilo al componente Navbar1 */}
      <DetallesProductoGeneral className="detalles-producto-general" id={id} /> {/* Aplica la clase de estilo al componente DetallesProductoGeneral */}
      <CardProductoOpcionesGeneral className="card-producto-opciones-general" /> {/* Aplica la clase de estilo al componente CardProductoOpcionesGeneral */}

      <PreguntasProductoComponenteCompletoGeneral  id_producto={ id}/>
    </div>
  );
}
