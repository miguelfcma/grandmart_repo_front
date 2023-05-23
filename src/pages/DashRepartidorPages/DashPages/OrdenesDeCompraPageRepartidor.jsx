import { ListaOrdenesRepartidor } from "../../../components/OrdenesComponents/OrdenesRepartidor/ListaOrdenesRepartidor";
import { SidebarRepartidor } from "../../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../../components/DashRepartidorComponents/HeaderRepartidor";
import "../DashRepartidor.css";

export function OrdenesDeCompraPageRepartidor() {
  return (
    <div className="dashboard-container">
      <SidebarRepartidor />
      <div className="contenidoPages">
        <HeaderRepartidor />
      <ListaOrdenesRepartidor />
    </div>
    </div>
  );
}
