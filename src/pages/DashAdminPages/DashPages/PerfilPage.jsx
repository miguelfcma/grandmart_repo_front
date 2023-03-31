import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
export function PerfilPage() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <Sidebar />
      
      <CardUsuarioDomicilio />
    </div>
  );
}
