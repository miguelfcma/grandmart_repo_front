import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { useParams } from "react-router-dom";
import { ListaPedidosAdmin } from "../../../../components/OrdenesComponents/PedidosAdmin/ListaPedidosAdmin";

export  function PedidoDetallesPagesAdmin() {
    const { id_orden } = useParams();

    return (
      <div style={{ marginLeft: "200px" }}>
        <HeaderAdmin />
        <SidebarAdmin />
        
    </div>
  )
}
