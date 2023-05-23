import { SidebarRepartidor } from "../../../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../../../components/DashRepartidorComponents/HeaderRepartidor";
import { DetallesOrdenRepartidor } from "../../../../components/OrdenesComponents/OrdenesRepartidor/DetallesOrdenRepartidor";
import { useParams } from "react-router-dom";
import "../../DashRepartidor.css";

export function OrdenDetallesPageRepartidor() {
  const { id_orden } = useParams();

  return (
    <div className="dashboard-container">
      <SidebarRepartidor />
      <div className="contenidoPages">
        <HeaderRepartidor />
      <DetallesOrdenRepartidor id_orden={id_orden} />
    </div>
    </div>
  );
}
