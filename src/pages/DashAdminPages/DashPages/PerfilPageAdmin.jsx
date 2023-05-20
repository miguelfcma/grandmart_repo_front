import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { CardDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardDomicilio";
import "../DashAdmin.css";

export function PerfilPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
      <CardDomicilio />
    </div>
    </div>
  );
}
