import { DashAdmin } from "../DashAdmin";

import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
export function PerfilPage() {
  return (
    <div style={{ marginLeft: "200px" }}>
      <DashAdmin />
      
      <CardUsuarioDomicilio />
    </div>
  );
}
