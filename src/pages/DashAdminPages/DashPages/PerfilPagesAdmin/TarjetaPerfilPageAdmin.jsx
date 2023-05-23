import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "../../DashAdmin.css";
import { CardTarjeta } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsAdmin/TarjetaPerfilAdmin/CardTarjeta";

export function TarjetaPerfilPageAdmin() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <CardTarjeta />
      </div>
    </div>
  );
}
