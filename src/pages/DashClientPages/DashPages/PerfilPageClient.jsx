import { Sidebar } from "../../../components/DashClientComponents/Sidebar";
import { Header } from "../../../components/DashClientComponents/Header";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";

export function PerfilPageClient() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <Header/>
      <Sidebar />
      <CardUsuarioDomicilio />
    </div>
  );
}
