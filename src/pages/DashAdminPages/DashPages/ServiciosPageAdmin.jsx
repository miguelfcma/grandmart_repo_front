import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import  FormCompletoServicioAdmin  from "../../../components/ServicioComponents/ServiciosAdmin/FormCompletoServicioAdmin";
import { ListServiciosAdmin } from "../../../components/ServicioComponents/ServiciosAdmin/ListServiciosAdmin";

export function ServiciosPageAdmin() {
  return (
    <div className="content-container">
      <HeaderAdmin/>
      <SidebarAdmin />
      <h1>Página de servicios</h1>
      <FormCompletoServicioAdmin/>
      <ListServiciosAdmin/>
    </div>
  )
}
