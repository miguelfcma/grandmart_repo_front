import { FormImgProductoCliente } from "../../../../components/ProductoComponents/ProductosClient/FormImgProductoCliente";
import { useParams } from "react-router-dom";

export function RegistroProductoClientPage2() {
  const { idProducto } = useParams();
  return (
    <div>
      <FormImgProductoCliente idProducto={idProducto} />
    </div>
  );
}
