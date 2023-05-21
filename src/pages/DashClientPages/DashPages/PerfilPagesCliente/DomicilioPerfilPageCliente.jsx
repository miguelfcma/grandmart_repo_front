import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";
export function DomicilioPerfilPageCliente(){
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
      </div>
    </div>
  );
}
