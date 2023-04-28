import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import { ResenaCliente } from "../../../../components/OrdenesComponents/ComprasCliente/ReviewsProductosCompras/ResenaCliente";
import { useParams } from "react-router-dom";

export function CompraOpinarProductoCliente() {
  const { id_producto } = useParams();
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <HeaderCliente />
      <div className="contenidoPages">
        <ResenaCliente id_producto={id_producto} />
      </div>
    </div>
  );
}
