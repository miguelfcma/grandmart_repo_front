import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { ListaVentasAdmin } from "../../../components/OrdenesComponents/VentasAdmin/ListaVentasAdmin";

export function VentasPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <ListaVentasAdmin/>
      </div>
    </div>
  );
}
