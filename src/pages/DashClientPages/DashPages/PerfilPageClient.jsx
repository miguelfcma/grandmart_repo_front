import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";

export function PerfilPageClient() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <HeaderCliente/>
      <SidebarCliente />
      <CardUsuarioDomicilio />
    </div>
  );
}
