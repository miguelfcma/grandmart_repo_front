import { FormProductoAdmin } from "../../../../components/ProductoComponents/ProductosAdmin/FormProductoAdmin";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";

export function RegistroProductoAdminPage1() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <FormProductoAdmin />
      </div>
    </div>
  );
}
