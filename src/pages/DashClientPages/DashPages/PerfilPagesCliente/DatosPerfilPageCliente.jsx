import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";
import { DatosPerfil } from "../../../../components/usuarioComponents/UsuarioPerfilComponentsCliente/DatosPerfilCliente/DatosPerfil";
export function DatosPerfilPageCliente() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <DatosPerfil />
     
      </div>
    </div>
  )
}
