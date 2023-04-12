import { ListaCategoriasGeneral } from "../../../components/CategoriaComponents/CategoriasGeneral/ListaCategoriasGeneral";
import { Navbar } from "../../../components/HomePageComponents/NavBar";

export function CategoriasHomePage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar />
      <ListaCategoriasGeneral />
    </div>
  );
}
