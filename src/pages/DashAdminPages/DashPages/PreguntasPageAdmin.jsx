import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { ListaProductoConPreguntasYReviewsAdmin } from "../../../components/ProductoComponents/ProductosAdmin/PreguntasReviewsAdmin/ListaProductoConPreguntasYReviewsAdmin";

export function PreguntasPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <ListaProductoConPreguntasYReviewsAdmin/>
      </div>
    </div>
  );
}
