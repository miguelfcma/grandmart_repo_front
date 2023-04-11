
import { FormProductoAdmin } from "../../../../components/ProductoComponents/ProductosAdmin/FormProductoAdmin";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";

export function RegistroProductoAdminPage1() {
  return (
    <div style={{ marginLeft: '200px' }}>
   <HeaderAdmin/>
      <SidebarAdmin />
      <FormProductoAdmin/>
    </div>
  );
}
