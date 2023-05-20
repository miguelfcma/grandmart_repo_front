import { FormImgProductoAdmin } from "../../../../components/ProductoComponents/ProductosAdmin/FormImgProductoAdmin";
import { useParams } from "react-router-dom";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";

export function RegistroProductoAdminPage2() {
  const { idProducto } = useParams();
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <Link to="/dashAdmin">
          <img
            alt="e-commerce"
            src="../src/components/HomePageComponents/logo.png"
          />
          <br></br>
        </Link>
        <FormImgProductoAdmin idProducto={idProducto} />
      </div>
    </div>
  );
}
