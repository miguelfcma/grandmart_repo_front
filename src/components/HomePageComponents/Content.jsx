//Este archivo es para el contenido mostrado en la pagina inicial del sistema, donde se muestra la barra de navegacion, el carrusel de imagenes y los productos ofrecidos en el sistema

import "./Content.css";
import { ListProductsGeneral } from "../ProductoComponents/ProductosGeneral/ListaGeneralProductos/ListProductsGeneral";
import {Carrusel} from "./Carrusel/Carrusel";
import { FiltradoProductosPorBusqueda } from "../ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";

//searchTerm es una prop(propiedad) que se pasa al componente "Content" como argumento, esta prop contiene informacion sobre un termino de busqueda
export function Content({ searchTerm }) {

  return (
    <>
      <main>
        {searchTerm ? (
          /*Si se proporciona un término de búsqueda, muestra como contenido el filtrado de productos que coincidan con la busqueda*/
          <FiltradoProductosPorBusqueda searchTerm={searchTerm}/>
        ) : (
          <>
          {/*Si no hay término de búsqueda, muestra el carrusel y la lista de productos generales*/}
          <Carrusel/>
          <ListProductsGeneral  />
          </>
        )}
      </main>
      <footer>
        <p>Derechos Reservados © 2023 GrandMart</p>
      </footer>
    </>
  );
}
