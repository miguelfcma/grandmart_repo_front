import { DashAdmin } from "../DashAdmin";
import { FormUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/FormUsuarioDomicilio";
import { CardUsuarioDomicilio } from "../../../components/usuarioComponents/UsuarioPerfilComponents/CardUsuarioDomicilio";
export  function PerfilPage() {
  return (
    <div style={{ marginLeft: '200px' }}>
      <DashAdmin />
        <FormUsuarioDomicilio/>
      <CardUsuarioDomicilio/>
    </div>
  )
}
