import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";
import { CardDomicilio } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsCliente/DomicilioPefilCliente/CardDomicilio";

export function DomicilioPerfilPageCliente(){
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <CardDomicilio />
      </div>
    </div>
  );
}
