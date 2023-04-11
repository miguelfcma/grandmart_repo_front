import { FormImgProductoAdmin } from "../../../../components/ProductoComponents/ProductosAdmin/FormImgProductoAdmin";
import { useParams } from "react-router-dom";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";

export function RegistroProductoAdminPage2() {
  const { idProducto } = useParams();
  return (
    <div style={{ marginLeft: '200px' }}>
      <HeaderAdmin/>
      <SidebarAdmin />
      <FormImgProductoAdmin idProducto={idProducto} />
    </div>
  );
}
