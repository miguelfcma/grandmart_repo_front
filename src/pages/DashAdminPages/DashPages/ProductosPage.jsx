import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { Header } from "../../../components/DashAdminComponents/Header";
import { ListProductos } from "../../../components/ProductoComponents/admin/ListProductos";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ProductosPage() {

  return (
    <div className="content-container">
      <Header/>
      <Sidebar />
      <h1>Página de productos</h1>
      <Link to="/dashAdmin/productos/registro-producto" style={{ textDecoration: "none" }}>
        < button type="submit"> Nuevo registro </button>
      </Link>

      <ListProductos />
    </div>
  );
}
