import { useParams } from "react-router-dom";
import { DetallesProducto } from "../../../components/ProductoComponents/client/DetallesProducto";
import { Navbar } from "../../../components/HomePageComponents/NavBar";

export function ProductosDetallesPage() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <DetallesProducto id={id} />
    </>
  );
}
