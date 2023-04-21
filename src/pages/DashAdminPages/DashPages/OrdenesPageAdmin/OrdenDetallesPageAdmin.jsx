import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import { useParams } from "react-router-dom";
import { DetallesOrdenAdmin } from "../../../../components/OrdenesComponents/OrdenesAdmin/DetallesOrdenAdmin";

export  function OrdenDetallesPageAdmin() {
    const { id_orden } = useParams();
    
  return (
    <div style={{ marginLeft: "200px" }}>
    <HeaderAdmin/>
    <SidebarAdmin />
    <DetallesOrdenAdmin id_orden={id_orden}/>
    </div>
  )
}
