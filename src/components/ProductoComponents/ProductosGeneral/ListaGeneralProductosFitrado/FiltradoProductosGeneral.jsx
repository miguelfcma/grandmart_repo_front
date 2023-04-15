import { useEffect } from "react";
import { CardProductoGeneral } from "../ListaGeneralProductos/CardProductoGeneral";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useCategorias } from "../../../CategoriaComponents/CategoriasContext/CategoriaProvider";

export function FiltradoProductosGeneral({id_categoria}) {
  const { productosAll, loadProductos } = useProductos();
  const { categorias, loadCategorias } = useCategorias();

  useEffect(() => {
    loadProductos();
    loadCategorias();
  }, []);

  function renderMain() {
    let filteredProducts = productosAll;
  
    if (id_categoria) {
      const categoriasHijas = categorias.filter(categoria => categoria.id_parent === parseInt(id_categoria));
      if (categoriasHijas.length > 0) {
        const idsCategoriasHijas = categoriasHijas.map(categoria => categoria.id);
        filteredProducts = productosAll.filter(producto => idsCategoriasHijas.includes(producto.id_categoria));
      } else {
        filteredProducts = productosAll.filter(producto => producto.id_categoria === parseInt(id_categoria));
      }
    }
  
    if (filteredProducts.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return filteredProducts.map(producto => (
        <CardProductoGeneral key={producto.id} producto={producto} />
      ));
    }
  }

  return (
    <>
      <div className="list-productos">{renderMain()}</div>
    </>
  );
}
