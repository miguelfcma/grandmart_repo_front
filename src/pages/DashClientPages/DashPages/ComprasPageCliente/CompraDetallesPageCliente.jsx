import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import { useParams } from "react-router-dom";
import { DetallesCompraCliente } from "../../../../components/OrdenesComponents/ComprasCliente/DetallesCompraCliente";
import "../../DashClient.css";

export  function CompraDetallesPageCliente() {
    const { id_orden } = useParams();

    return (
      <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <DetallesCompraCliente id_orden={id_orden}/>
    </div>
    </div>
  )
}
