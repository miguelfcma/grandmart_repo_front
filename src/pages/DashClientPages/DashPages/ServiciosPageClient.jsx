import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import FormCompletoServicioCliente from "../../../components/ServicioComponents/ServiciosCliente/FormCompletoServicioCliente";
import { ListServiciosCliente } from "../../../components/ServicioComponents/ServiciosCliente/ListServiciosCliente";

export function ServiciosPageClient() {
  return (
    <div className="content-container">
      <HeaderCliente/>
      <SidebarCliente/>
      <h1>Página de servicios</h1>
      <FormCompletoServicioCliente/>
     <ListServiciosCliente/> 
    </div>
  )
}


