import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import { DatosPerfil } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsAdmin/DatosPerfilAdmin/DatosPerfil";

export function DatosPerfilPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <DatosPerfil/>
      </div>
    </div>
  )
}
