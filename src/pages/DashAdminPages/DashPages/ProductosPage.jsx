import { DashAdmin } from "../DashAdmin";
import { ListProductos } from "../../../components/ProductoComponents/ListProductos";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ProductosPage() {

  return (
    <div className="content-container">
      <DashAdmin />
      <h1>Página de productos</h1>

      <Link to="/dashAdmin/productos/registro-1" style={{ textDecoration: "none" }}>
        < button type="submit"> Nuevo registro </button>
      </Link>

      <ListProductos />
      
      
    </div>
  );
}
