<<<<<<< Updated upstream
import { Sidebar } from "../../../components/DashAdminComponents/Sidebar";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
export function PerfilPage() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <Sidebar />
      
      <CardUsuarioDomicilio />
=======
import { DashAdmin } from "../DashAdmin";
import { FormUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/FormUsuarioDomicilio";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
export  function PerfilPage() {
  return (
    <div style={{ marginLeft: '200px' }}>
      <DashAdmin />
        <FormUsuarioDomicilio/>
      <CardUsuarioDomicilio/>
>>>>>>> Stashed changes
    </div>
  );
}
