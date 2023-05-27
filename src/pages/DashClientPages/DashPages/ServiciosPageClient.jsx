import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import { ListServiciosCliente } from "../../../components/ServicioComponents/ServiciosCliente/ListServiciosCliente";
import "../DashClient.css";
import { Link } from "react-router-dom";
export function ServiciosPageClient() {
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
      <HeaderCliente/>
      <h1>Página de servicios</h1>
      <Link
          to="/dashClient/servicios/registro-servicio"
          style={{ textDecoration: "none" }}
        >
          <button type="submit"> Nuevo registro </button>
        </Link>


     <ListServiciosCliente/> 
    </div>
    </div>
  )
}


