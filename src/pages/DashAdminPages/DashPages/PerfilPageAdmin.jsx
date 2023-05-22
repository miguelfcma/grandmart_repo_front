import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import "../DashAdmin.css";
import { CardOpcionesPerfilAdmin } from "../../../components/usuarioComponents/UsuarioPerfilComponentsAdmin/CardOpcionesPerfilAdmin";
export function PerfilPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
      <CardOpcionesPerfilAdmin />
    </div>
    </div>
  );
}
