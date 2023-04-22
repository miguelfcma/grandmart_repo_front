import { ListaOrdenesAdmin } from "../../../components/OrdenesComponents/OrdenesAdmin/ListaOrdenesAdmin";
import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import "../DashAdmin.css";

export function OrdenesDeCompraPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
      <ListaOrdenesAdmin />
    </div>
    </div>
  );
}
