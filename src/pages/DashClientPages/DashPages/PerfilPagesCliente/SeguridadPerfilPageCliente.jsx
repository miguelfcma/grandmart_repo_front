import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";

import { FormularioCambiarContrasena } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsCliente/SeguridadPerfilCliente/FormularioCambiarContrasena";
export function SeguridadPerfilPageCliente() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <FormularioCambiarContrasena />
      </div>
    </div>
  );
}
