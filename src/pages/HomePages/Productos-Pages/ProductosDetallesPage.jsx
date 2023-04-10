import { useParams } from "react-router-dom";
import { DetallesProductoGeneral } from "../../../components/ProductoComponents/ProductosGeneral/VistaDetallesProductoGeneral/DetallesProductoGeneral";
import { Navbar } from "../../../components/HomePageComponents/NavBar";

export function ProductosDetallesPage() {
  const { id } = useParams();
  return (
    <div style={{ paddingTop: "80px" }} >
      <Navbar />
      <DetallesProductoGeneral id={id} />
    </div>
  );
}
