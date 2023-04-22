import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import FormCompletoServicioCliente from "../../../components/ServicioComponents/ServiciosCliente/FormCompletoServicioCliente";
import { ListServiciosCliente } from "../../../components/ServicioComponents/ServiciosCliente/ListServiciosCliente";
import "../DashClient.css";

export function ServiciosPageClient() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
      <HeaderCliente/>
      <h1>Página de servicios</h1>
      <FormCompletoServicioCliente/>
     <ListServiciosCliente/> 
    </div>
    </div>
  )
}


