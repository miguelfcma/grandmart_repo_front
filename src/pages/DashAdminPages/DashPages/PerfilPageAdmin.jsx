import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
export function PerfilPageAdmin() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <Sidebar />
      
      <CardUsuarioDomicilio />
    </div>
  );
}
