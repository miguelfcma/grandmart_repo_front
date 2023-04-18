import { useEffect } from "react";
import { CardProductoGeneral } from "../ListaGeneralProductos/CardProductoGeneral";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useCategorias } from "../../../CategoriaComponents/CategoriasContext/CategoriaProvider";

export function FiltradoProductosGeneral({ id_categoria, nombre_categoria }) {
  const { productosAll, loadProductos } = useProductos();
  const { categorias, loadCategorias } = useCategorias();

  useEffect(() => {
    loadProductos();
    loadCategorias();
  }, []);

  function renderMain() {
    let filteredProducts = productosAll;

    if (id_categoria) {
      const categoriasHijas = categorias.filter(
        (categoria) => categoria.id_parent === parseInt(id_categoria)
      );
      if (categoriasHijas.length > 0) {
        const idsCategoriasHijas = categoriasHijas.map(
          (categoria) => categoria.id
        );
        filteredProducts = productosAll.filter((producto) =>
          idsCategoriasHijas.includes(producto.id_categoria)
        );
      } else {
        filteredProducts = productosAll.filter(
          (producto) => producto.id_categoria === parseInt(id_categoria)
        );
      }
    }

    if (filteredProducts.length === 0) {
      return (
        <div>
          <div style={{fontSize: "30px", paddingTop: "50px"}}>
            Por ahora no hay productos registrados en esta categoría. Lo sentimos.
          </div>
          <br></br><br></br><br></br><br></br>
        </div>
      );
    } else {
      const categoriaFiltrada = `Estás en la categoría de "${nombre_categoria}".`;
      return (
        <div>
          <div style={{fontSize: "30px", paddingTop: "20px"}}>
            {categoriaFiltrada}
            <br></br>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredProducts.map((producto) => (
              <div key={producto.id} style={{
                marginTop: "20px", 
                marginRight: "35px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "20px",
                alignItems: "stretch",
                flex: "1 0 300px", /* Se establece una flex-basis de 300px*/}}>
                <CardProductoGeneral key={producto.id} producto={producto} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div>{renderMain()}</div>
    </>
  );
}
