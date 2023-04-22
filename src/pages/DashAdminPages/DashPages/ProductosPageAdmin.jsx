import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { ListProductosAdmin } from "../../../components/ProductoComponents/ProductosAdmin/ListProductosAdmin";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../DashAdmin.css";

export function ProductosPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <h1>Página de productos</h1>
        <Link
          to="/dashAdmin/productos/registro-producto"
          style={{ textDecoration: "none" }}
        >
          <button type="submit"> Nuevo registro </button>
        </Link>

        <ListProductosAdmin />
      </div>
    </div>
  );
}
