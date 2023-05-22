import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import { CardContrasena } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsAdmin/SeguridadPerfilAdmin/CardContrasena";
export function SeguridadPerfilPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <CardContrasena/>
      </div>
    </div>
  );
}
