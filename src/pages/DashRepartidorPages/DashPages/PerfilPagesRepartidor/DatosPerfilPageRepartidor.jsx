import { SidebarRepartidor } from "../../../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../../../components/DashRepartidorComponents/HeaderRepartidor";

import { DatosPerfil } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsRepartidor/DatosPerfilRepartidor/DatosPerfil";
export function DatosPerfilPageRepartidor() {
  return (
    <div className="dashboard-container">
      <SidebarRepartidor />
      <div className="contenidoPages">
        <HeaderRepartidor />
        <DatosPerfil />
     
      </div>
    </div>
  )
}
