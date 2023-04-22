import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";

import { ListaProductoConPreguntasAdmin } from "../../../components/ProductoComponents/ProductosAdmin/PreguntasComponentsAdmin/ListaProductoConPreguntasAdmin";
export function PreguntasPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <ListaProductoConPreguntasAdmin/>
      </div>
    </div>
  );
}
