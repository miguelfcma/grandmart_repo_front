import { useEffect } from "react";
import { CardProducto } from "../../../components/ProductoComponents/client/CardProducto";
import { useProductos } from "../../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useParams } from "react-router-dom";

export function FilterProducts() {
  const { id_categoria } = useParams();
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    let filteredProducts = productos;

    if (id_categoria) {
      filteredProducts = productos.filter(
        (producto) => producto.categoria?.id === parseInt(id_categoria)
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
