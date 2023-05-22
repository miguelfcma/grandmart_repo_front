import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import { FormularioCambiarContrasena } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsAdmin/SeguridadPerfilAdmin/FormularioCambiarContrasena";
export function SeguridadPerfilPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <FormularioCambiarContrasena/>
      </div>
    </div>
  );
}
