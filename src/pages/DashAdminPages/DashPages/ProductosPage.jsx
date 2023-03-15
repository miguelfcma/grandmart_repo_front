import { DashAdmin } from "../DashAdmin";
import { ListProductos } from "../../../components/ProductoComponents/ListProductos";
import { Link } from "react-router-dom";
export function ProductosPage() {
  

  return (
    <div className="content-container">
      <DashAdmin />
      <h1>Página de productos</h1>
      <Link to="/dashAdmin/productos/registro">Nuevo registro</Link>
        
   

      <ListProductos />


    </div>
  );
}
