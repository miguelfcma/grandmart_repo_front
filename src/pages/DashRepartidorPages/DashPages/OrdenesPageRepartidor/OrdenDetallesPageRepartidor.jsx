import { SidebarRepartidor } from "../../../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../../../components/DashRepartidorComponents/HeaderRepartidor";
import { DetallesOrdenRepartidor } from "../../../../components/OrdenesComponents/OrdenesRepartidor/DetallesOrdenRepartidor";
import { useParams, useNavigate } from "react-router-dom";
import "../../DashRepartidor.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
export function OrdenDetallesPageRepartidor() {
  const { id_orden } = useParams();
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <SidebarRepartidor />
      <div className="contenidoPages">
        <HeaderRepartidor />
        <Breadcrumb style={{ backgroundColor: "#1256a3", fontWeight: "bold" }}>
          <Breadcrumb.Item
            onClick={() => navigate("/dashRepartidor/ordenes")}
            style={{ color: "white" }}
          >
            Órdenes
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Detalles de la Orden
          </Breadcrumb.Item>
        </Breadcrumb>
        <DetallesOrdenRepartidor id_orden={id_orden} />
      </div>
    </div>
  );
}
