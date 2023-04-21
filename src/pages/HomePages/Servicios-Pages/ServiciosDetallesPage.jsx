import { useParams } from "react-router-dom";
import { DetallesServicioGeneral } from "../../../components/ServicioComponents/ServiciosGeneral/ListaGeneralServicios/VistaDetallesServicioGeneral/DetallesServicioGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";

export function ServiciosDetallesPage() {
  const { id } = useParams();
  return (
    <div style={{ paddingTop: "80px" }} >
      <Navbar1 />
      <DetallesServicioGeneral id={id} />
    </div>
  );
}
