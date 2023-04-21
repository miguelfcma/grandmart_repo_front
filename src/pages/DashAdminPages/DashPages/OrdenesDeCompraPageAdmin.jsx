import { ListaOrdenesAdmin } from "../../../components/OrdenesComponents/OrdenesAdmin/ListaOrdenesAdmin";
import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";


export function OrdenesDeCompraPageAdmin() {
  return (
    <div style={{ marginLeft: "200px" }}>
    <HeaderAdmin/>
    <SidebarAdmin />
      <ListaOrdenesAdmin />
    </div>
  );
}
