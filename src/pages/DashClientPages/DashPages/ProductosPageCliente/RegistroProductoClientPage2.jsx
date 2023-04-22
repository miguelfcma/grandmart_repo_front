import { FormImgProductoCliente } from "../../../../components/ProductoComponents/ProductosClient/FormImgProductoCliente";
import { useParams } from "react-router-dom";
import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import "../../DashClient.css";

export function RegistroProductoClientPage2() {
  const { idProducto } = useParams();
  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <FormImgProductoCliente idProducto={idProducto} />
      </div>
    </div>
  );
}
