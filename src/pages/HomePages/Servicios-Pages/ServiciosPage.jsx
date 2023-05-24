import { ListServiciosGeneral } from "../../../components/ServicioComponents/ServiciosGeneral/ListaGeneralServicios/ListServiciosGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import {FooterHome} from "../../../components/HomePageComponents/FooterHome";

export function ServiciosPage() {
  return (
    <div style={{ paddingTop: "80px"}}>
      <Navbar1 />
      <div style={{fontSize: "30px", paddingTop: "1px", marginLeft: "38px"}}
      >Estás en la categoría de "Servicios".</div>
      <div style={{ paddingLeft: "30px", paddingRight: "45px"}}>
      <ListServiciosGeneral />
      </div>
      <FooterHome/>
    </div>
  );
}
