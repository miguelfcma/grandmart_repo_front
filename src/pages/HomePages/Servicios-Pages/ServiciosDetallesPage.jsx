import { useParams } from "react-router-dom";
import { DetallesServicioGeneral } from "../../../components/ServicioComponents/ServiciosGeneral/ListaGeneralServicios/VistaDetallesServicioGeneral/DetallesServicioGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";

export function ServiciosDetallesPage() {
  const { id } = useParams();
  return (
    <div className="productos-detalles-page">
      <Navbar1 className="navbar" />
      <div className="detalles-producto-general">
      <DetallesServicioGeneral id={id} />
      <FooterHome />
      </div>
    </div>
  );
}
