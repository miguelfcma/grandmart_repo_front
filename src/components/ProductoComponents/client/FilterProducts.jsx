import { useEffect } from "react";
import { CardProducto } from "./CardProducto";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";

export  function FilterProducts({id_categoria}) {
    const { productos, loadProductos } = useProductos();
    const { categorias, loadCategorias } = useCategorias();
    useEffect(() => {
      loadCategorias();
    }, []);
    useEffect(() => {
      loadProductos();
    }, []);
  
    function renderMain() {
      let filteredProducts = productos;
  
      if (id_categoria) {
        const categoriasHijas = categorias.filter(
          (categoria) => categoria.id_parent === parseInt(id_categoria)
        );
        const idsCategoriasHijas = categoriasHijas.map(
          (categoria) => categoria.id
        );
        filteredProducts = productos.filter((producto) =>
          idsCategoriasHijas.includes(producto.id_categoria)
        );
      }
  
      if (filteredProducts.length === 0) {
        return <h1>No hay productos registrados</h1>;
      } else {
        return filteredProducts.map((producto) => (
          <CardProducto key={producto.id} producto={producto} />
        ));
      }
    }
  
    return (
      <>
        <h2 className="titulo">Lista de productos:</h2>
        <div className="list-productos">{renderMain()}</div>
      </>
    );
  }
  