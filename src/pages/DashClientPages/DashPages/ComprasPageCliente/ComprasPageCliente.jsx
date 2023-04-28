import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import { ListaComprasCliente } from "../../../../components/OrdenesComponents/ComprasCliente/ListaComprasCliente";

export function ComprasPageCliente() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <ListaComprasCliente/>
      </div>
    </div>
  );
}
