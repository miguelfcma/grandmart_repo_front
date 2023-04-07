import { useParams } from "react-router-dom";
import { DetallesProductoGeneral } from "../../../components/ProductoComponents/general/VistaDetallesProductoGeneral/DetallesProductoGeneral";
import { Navbar } from "../../../components/HomePageComponents/NavBar";

export function ProductosDetallesPage() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <DetallesProductoGeneral id={id} />
    </>
  );
}
