import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";

export function ServiciosPageAdmin() {
  return (
    <div className="content-container">
      <HeaderAdmin/>
      <SidebarAdmin />
      <h1>Página de servicios</h1>
    </div>
  )
}
