import { FormImgProductoAdmin } from "../../../../components/ProductoComponents/ProductosAdmin/FormImgProductoAdmin";
import { useParams } from "react-router-dom";
export function RegistroProductoAdminPage2() {
  const { idProducto } = useParams();
  return (
    <div>
      <FormImgProductoAdmin idProducto={idProducto} />
    </div>
  );
}
