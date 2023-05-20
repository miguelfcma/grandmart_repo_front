import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { ListaComprasAdmin } from "../../../../components/OrdenesComponents/ComprasAdmin/ListaComprasAdmin";

export function ComprasPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <ListaComprasAdmin/>
      </div>
    </div>
  );
}
