import "./Content.css";
import { ListProductsGeneral } from "../ProductoComponents/ProductosGeneral/ListaGeneralProductos/ListProductsGeneral"
import {Carrusel} from "./Carrusel/Carrusel";

export function Content({ searchTerm }) {
  console.log(searchTerm);
  return (
    <>
      <main>
        <Carrusel/>
        <ListProductsGeneral searchTerm={searchTerm} />
        
      </main>
      <footer>
        <p>Derechos Reservados © 2023 GrandMart</p>
      </footer>
    </>
  );
}
