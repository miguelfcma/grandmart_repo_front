import { FormProductoAdmin } from "../../../../components/ProductoComponents/ProductosAdmin/FormProductoAdmin";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function RegistroProductoAdminPage1() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <Breadcrumb
          style={{
            backgroundColor: "#1256a3",
            fontWeight: "bold",
          }}
        >
          <Breadcrumb.Item onClick={() => navigate("/dashAdmin/productos")}>
            Productos
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Registro de Producto 1
          </Breadcrumb.Item>
        </Breadcrumb>

        <FormProductoAdmin />
      </div>
    </div>
  );
}
