import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { ResenaAdmin } from "../../../../components/OrdenesComponents/ComprasAdmin/ReviewsProductosCompras/ResenaAdmin";
import { useParams } from "react-router-dom";

export function CompraOpinarProductoAdmin() {
  const { id_producto } = useParams();
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <HeaderAdmin />
      <div className="contenidoPages">
        <ResenaAdmin id_producto={id_producto} />
      </div>
    </div>
  );
}
