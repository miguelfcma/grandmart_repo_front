import { FormImgProductoCliente } from "../../../../components/ProductoComponents/ProductosClient/FormImgProductoCliente";
import { useParams } from "react-router-dom";
import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";

export function RegistroProductoClientPage2() {
  const { idProducto } = useParams();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />

        <Breadcrumb
          style={{
            backgroundColor: "#1256a3",
            fontWeight: "bold",
          }}
        >
          <Breadcrumb.Item onClick={() => navigate("/dashClient/productos")}>
            Productos
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => navigate(`/dashClient/productos/registro-producto`)}
          >
            Registro de Producto 1
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Registro de Producto 2
          </Breadcrumb.Item>
        </Breadcrumb>

        <FormImgProductoCliente idProducto={idProducto} />
      </div>
    </div>
  );
}
