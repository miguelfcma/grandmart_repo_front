import { FormImgProducto } from "../../../../components/ProductoComponents/ImgProductoComponent/FormImgProducto";
import { useParams } from "react-router-dom";
export function RegistroProductoPage2() {
  const { idProducto } = useParams();
  return (
    <div>
      <FormImgProducto idProducto={idProducto} />
    </div>
  );
}