import { DashAdmin } from "../DashAdmin";
import { FormCreateUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/FormCreateUsuarioDomicilio";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
export function PerfilPage() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <DashAdmin />
      <FormCreateUsuarioDomicilio />
      <CardUsuarioDomicilio />
    </div>
  );
}
