import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";

import { CardTarjeta } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsCliente/TarjetaPerfilCliente/CardTarjeta";

export function TarjetaPerfilPageCliente() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <CardTarjeta />
      </div>
    </div>
  );
}
