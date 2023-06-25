import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import { ResenaCliente } from "../../../../components/OrdenesComponents/ComprasCliente/ReviewsProductosCompras/ResenaCliente";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
export function CompraOpinarProductoCliente() {
  const { id_producto, id_orden } = useParams();
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <SidebarCliente />

      <div className="contenidoPages">
        {" "}
        <HeaderCliente />
        <Breadcrumb
          style={{
            backgroundColor: "#1256a3",
            fontWeight: "bold",
          }}
        >
          <Breadcrumb.Item onClick={() => navigate("/dashClient/compras")}>
            Compras
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => navigate(`/dashClient/compras/detalles/${id_orden}`)}
          >
            Detalles compra
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Opinar
          </Breadcrumb.Item>
        </Breadcrumb>
        <ResenaCliente id_producto={id_producto} />
      </div>
    </div>
  );
}
