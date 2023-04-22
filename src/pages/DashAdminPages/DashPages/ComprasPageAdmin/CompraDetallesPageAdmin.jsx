import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { useParams } from "react-router-dom";
import { DetallesCompraAdmin } from "../../../../components/OrdenesComponents/ComprasAdmin/DetallesCompraAdmin";

export  function CompraDetallesPageAdmin() {
    const { id_orden } = useParams();

    return (
      <div style={{ marginLeft: "200px" }}>
        <HeaderAdmin />
        <SidebarAdmin />
        <DetallesCompraAdmin id_orden={id_orden}/>
    </div>
  )
}
