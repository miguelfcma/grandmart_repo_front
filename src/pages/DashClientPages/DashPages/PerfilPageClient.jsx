import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import { CardOpcionesPerfilCliente } from "../../../components/usuarioComponents/UsuarioPerfilComponentsCliente/CardOpcionesPerfilCliente";
export function PerfilPageClient() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <CardOpcionesPerfilCliente />
      </div>
    </div>
  );
}
