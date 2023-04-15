import { useParams } from "react-router-dom";
import { DetallesProductoGeneral } from "../../../components/ProductoComponents/ProductosGeneral/VistaDetallesProductoGeneral/DetallesProductoGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";

export function ProductosDetallesPage() {
  const { id } = useParams();
  return (
    <div style={{ paddingTop: "80px" }} >
      <Navbar1 />
      <DetallesProductoGeneral id={id} />
    </div>
  );
}
