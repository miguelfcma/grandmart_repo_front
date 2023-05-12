import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { ListaProductoConDenunciasAdmin } from "../../../components/ProductoComponents/ProductosAdmin/DenunciasComponentsAdmin/ListaProductoConDenunciasAdmin";

export function DenunciasPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <ListaProductoConDenunciasAdmin /> 
      </div>
    </div>
  );
}
