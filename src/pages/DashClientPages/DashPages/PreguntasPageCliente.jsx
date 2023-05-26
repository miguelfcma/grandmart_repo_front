import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import { ListaProductoConPreguntasYReviewsCliente } from "../../../components/ProductoComponents/ProductosClient/PreguntasReviewsCliente/ListaProductoConPreguntasYReviewsCliente";

export function PreguntasPageCliente() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <ListaProductoConPreguntasYReviewsCliente/>
      </div>
    </div>
  );
}
