import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import FormCompletoServicioAdmin from "../../../components/ServicioComponents/ServiciosAdmin/FormCompletoServicioAdmin";
import { ListServiciosAdmin } from "../../../components/ServicioComponents/ServiciosAdmin/ListServiciosAdmin";
import "../DashAdmin.css";

export function ServiciosPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <h1>Página de servicios</h1>
        <FormCompletoServicioAdmin />
        <ListServiciosAdmin />
      </div>
    </div>
  );
}
