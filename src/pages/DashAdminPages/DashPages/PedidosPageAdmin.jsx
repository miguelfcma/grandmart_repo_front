import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { ListaPedidosAdmin } from "../../../components/OrdenesComponents/PedidosAdmin/ListaPedidosAdmin";

export function PedidosPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <ListaPedidosAdmin/>
      </div>
    </div>
  );
}
