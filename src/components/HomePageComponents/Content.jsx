import "./Content.css";
import { ListProductsGeneral } from "../ProductoComponents/ProductosGeneral/ListaGeneralProductos/ListProductsGeneral"

export function Content({ searchTerm }) {
  console.log(searchTerm);
  return (
    <>
      <main>
        <section id="hero">
          <h1>Bienvenido</h1>
          <p>Encuentra los mejores productos al mejor precio</p>
          <div id="carousel-container">
            <img></img>
          </div>
        </section>

        <ListProductsGeneral searchTerm={searchTerm} />
        
      </main>
      <footer>
        <p>Derechos Reservados © 2023 GrandMart</p>
      </footer>
    </>
  );
}
