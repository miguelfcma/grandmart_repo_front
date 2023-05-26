import { SidebarRepartidor } from "../../../../components/DashRepartidorComponents/SidebarRepartidor";
import { HeaderRepartidor } from "../../../../components/DashRepartidorComponents/HeaderRepartidor";


import { FormularioCambiarContrasena } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsRepartidor/SeguridadPerfilRepartidor/FormularioCambiarContrasena";
export function SeguridadPerfilPageRepartidor() {
  return (
    <div className="dashboard-container">
      <SidebarRepartidor />
      <div className="contenidoPages">
        <HeaderRepartidor />
        <FormularioCambiarContrasena />
      </div>
    </div>
  );
}
