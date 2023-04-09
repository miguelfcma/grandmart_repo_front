import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";

export function PerfilPageAdmin() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <HeaderAdmin/>
      <SidebarAdmin />
      <CardUsuarioDomicilio />
    </div>
  );
}
