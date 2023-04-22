import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";

import { DetallesOrdenAdmin } from "../../../../components/OrdenesComponents/OrdenesAdmin/DetallesOrdenAdmin";
import { useParams } from "react-router-dom";


export function OrdenDetallesPageAdmin() {
  const { id_orden } = useParams();

  return (
    <div style={{ marginLeft: "200px" }}>
      <HeaderAdmin />
      <SidebarAdmin />
      <DetallesOrdenAdmin id_orden={id_orden} />
    </div>
  );
}
