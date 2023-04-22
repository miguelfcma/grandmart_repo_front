import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
import "../DashClient.css";

export function PerfilPageClient() {
  return (
    <div className="dashboard-container">
      <SidebarCliente/>
      <div className="contenidoPages">
      <HeaderCliente/>
      <CardUsuarioDomicilio />
    </div>
    </div>
  );
}
