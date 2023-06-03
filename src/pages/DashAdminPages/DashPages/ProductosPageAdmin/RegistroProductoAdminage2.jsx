import { FormImgProductoAdmin } from "../../../../components/ProductoComponents/ProductosAdmin/FormImgProductoAdmin";
import { useParams, Link,useNavigate } from "react-router-dom";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function RegistroProductoAdminPage2() {
  const { idProducto } = useParams();
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
          <Breadcrumb.Item
            onClick={() => navigate("/dashAdmin/productos/registro-producto")}
          >
            Registro de Producto 1
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Registro de Producto 2</Breadcrumb.Item>
        </Breadcrumb>

        <FormImgProductoAdmin idProducto={idProducto} />
      </div>
    </div>
  );
}
