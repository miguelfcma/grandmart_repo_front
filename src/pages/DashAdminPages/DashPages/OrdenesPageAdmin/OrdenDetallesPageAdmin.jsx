import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { DetallesOrdenAdmin } from "../../../../components/OrdenesComponents/OrdenesAdmin/DetallesOrdenAdmin";
import { useParams } from "react-router-dom";
import "../../DashAdmin.css";

export function OrdenDetallesPageAdmin() {
  const { id_orden } = useParams();

  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
      <DetallesOrdenAdmin id_orden={id_orden} />
    </div>
    </div>
  );
}
