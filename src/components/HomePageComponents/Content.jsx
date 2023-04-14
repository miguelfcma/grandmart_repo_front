import "./Content.css";
import { ListProductsGeneral } from "../ProductoComponents/ProductosGeneral/ListaGeneralProductos/ListProductsGeneral"
import {Carrusel} from "./Carrusel/Carrusel";
import { FiltradoProductosPorBusqueda } from "../ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
export function Content({ searchTerm }) {
  console.log("siuu el bicho",searchTerm)
  return (
    <>
      <main>
        <Carrusel/>
        {searchTerm ? (
          <FiltradoProductosPorBusqueda searchTerm={searchTerm}/>
        ) : (
          
          <ListProductsGeneral  />

        )}
      </main>
      <footer>
        <p>Derechos Reservados © 2023 GrandMart</p>
      </footer>
    </>
  );
}
