import { Sidebar } from "../../../components/DashClientComponents/Sidebar";
import { Header } from "../../../components/DashClientComponents/Header";
import "../../../components/DashClientComponents/Sidebar.css";
import { ListProductos } from "../../../components/ProductoComponents/client/ListProductos";
import { Link } from "react-router-dom";

export function ProductosClient() {
  return (
    <div className="content-container">
      <Header/>
      <Sidebar/>
      <h1>Página de productos</h1>
      <Link to="/dashClient/productos/registro-producto" style={{ textDecoration: "none" }}>
        < button type="submit"> Nuevo registro </button>
      </Link>

      <ListProductos />
    </div>
  )
}
