import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";

export function ServiciosPageClient() {
  return (
    <div className="content-container">
      <HeaderCliente/>
      <SidebarCliente/>
      <h1>Página de servicios</h1>
    </div>
  )
}


