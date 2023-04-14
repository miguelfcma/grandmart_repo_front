import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import FormCompletoServicioAdmin from "../../../components/ServicioComponents/ServiciosAdmin/FormCompletoServicioAdmin";

export function ServiciosPageAdmin() {
  return (
    <div className="content-container">
      <HeaderAdmin/>
      <SidebarAdmin />
      <FormCompletoServicioAdmin/>
      <h1>Página de servicios</h1>
    </div>
  )
}
