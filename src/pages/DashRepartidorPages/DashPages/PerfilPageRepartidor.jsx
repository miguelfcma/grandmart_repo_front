import { SidebarRepartidor } from "../../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../../components/DashRepartidorComponents/HeaderRepartidor";
import { CardOpcionesPerfilRepartidor } from "../../../components/usuarioComponents/UsuarioPerfilComponentsRepartidor/CardOpcionesPerfilRepartidor";
export function PerfilPageRepartidor() {
  return (
    <div className="dashboard-container">
      <SidebarRepartidor />
      <div className="contenidoPages">
        <HeaderRepartidor />
        <CardOpcionesPerfilRepartidor />
      </div>
    </div>
  );
}
