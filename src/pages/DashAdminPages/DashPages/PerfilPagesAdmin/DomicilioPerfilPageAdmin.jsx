import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import { CardDomicilio } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsAdmin/DomicilioPefilAdmin/CardDomicilio";
export function DomicilioPerfilPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <CardDomicilio/>
      </div>
    </div>
  );
}
