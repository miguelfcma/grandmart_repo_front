import { ListaCategoriasGeneral } from "../../../components/CategoriaComponents/CategoriasGeneral/ListaCategoriasGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";

export function CategoriasHomePage() {
  return (
    <div style={{ paddingTop: "80px"}}>
      <Navbar1 />
      <div style={{ paddingLeft: "30px", paddingRight: "45px"}}>
      <ListaCategoriasGeneral />
      </div>
    </div>
  );
}
