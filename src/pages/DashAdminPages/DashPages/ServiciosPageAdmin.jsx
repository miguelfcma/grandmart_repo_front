import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";

import { ListServiciosAdmin } from "../../../components/ServicioComponents/ServiciosAdmin/ListServiciosAdmin";
import "../DashAdmin.css";
import { Link } from "react-router-dom";
export function ServiciosPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <h1>Página de servicios</h1>
        <Link
          to="/dashAdmin/servicios/registro-servicio"
          style={{ textDecoration: "none" }}
        >
          <button type="submit"> Nuevo registro </button>
        </Link>

        <ListServiciosAdmin />
      </div>
    </div>
  );
}
