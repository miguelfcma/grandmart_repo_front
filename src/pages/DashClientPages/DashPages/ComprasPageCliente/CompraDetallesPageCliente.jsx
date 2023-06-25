import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import { useParams, useNavigate } from "react-router-dom";
import { DetallesCompraCliente } from "../../../../components/OrdenesComponents/ComprasCliente/DetallesCompraCliente";
import "../../DashClient.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
export function CompraDetallesPageCliente() {
  const { id_orden } = useParams();
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
          <Breadcrumb.Item onClick={() => navigate("/dashClient/compras")}>
            Compras
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Detalles compra
          </Breadcrumb.Item>
        </Breadcrumb>
        <DetallesCompraCliente id_orden={id_orden} />
      </div>
    </div>
  );
}
