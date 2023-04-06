import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { Header } from "../../../components/DashAdminComponents/Header";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";

export function PerfilPageAdmin() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <Header/>
      <Sidebar />
      <CardUsuarioDomicilio />
    </div>
  );
}
