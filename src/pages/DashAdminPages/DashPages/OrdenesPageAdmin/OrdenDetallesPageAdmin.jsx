import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { DetallesOrdenAdmin } from "../../../../components/OrdenesComponents/OrdenesAdmin/DetallesOrdenAdmin";
import { useParams, useNavigate } from "react-router-dom";
import "../../DashAdmin.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function OrdenDetallesPageAdmin() {
  const { id_orden } = useParams();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <Breadcrumb style={{ backgroundColor: "#1256a3", fontWeight: "bold" }}>
          <Breadcrumb.Item
            onClick={() => navigate("/dashAdmin/ordenes")}
            style={{ color: "white" }}
          >
            Órdenes
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Detalles de la Orden
          </Breadcrumb.Item>
        </Breadcrumb>
        <DetallesOrdenAdmin id_orden={id_orden} />
      </div>
    </div>
  );
}
