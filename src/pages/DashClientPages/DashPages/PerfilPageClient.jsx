import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import { CardOpcionesPerfil } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardOpcionesPerfil";

export function PerfilPageClient() {
  return (
    <div className="dashboard-container">
      <SidebarCliente/>
      <div className="contenidoPages">
      <HeaderCliente/>
      <CardOpcionesPerfil />
    </div>
    </div>
  );
}
