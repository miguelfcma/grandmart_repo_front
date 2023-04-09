import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";

import { ListProductos } from "../../../components/ProductoComponents/client/ListProductos";
import { Link } from "react-router-dom";

export function ProductosClient() {
  return (
    <div className="content-container">
      <HeaderCliente/>
      <SidebarCliente/>
      <h1>Página de productos</h1>
      <Link to="/dashClient/productos/registro-producto" style={{ textDecoration: "none" }}>
        < button type="submit"> Nuevo registro </button>
      </Link>

      <ListProductos />
    </div>
  )
}
