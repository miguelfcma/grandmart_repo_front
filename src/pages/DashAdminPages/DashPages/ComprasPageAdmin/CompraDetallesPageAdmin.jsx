import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { useParams } from "react-router-dom";
import { DetallesCompraAdmin } from "../../../../components/OrdenesComponents/ComprasAdmin/DetallesCompraAdmin";
import "../../DashClient.css";

export  function CompraDetallesPageAdmin() {
    const { id_orden } = useParams();

    return (
      <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <DetallesCompraAdmin id_orden={id_orden}/>
    </div>
    </div>
  )
}
