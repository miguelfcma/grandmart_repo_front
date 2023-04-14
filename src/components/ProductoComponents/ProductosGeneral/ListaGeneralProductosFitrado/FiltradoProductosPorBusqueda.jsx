import { useEffect } from "react";
import { CardProductoGeneral } from "../ListaGeneralProductos/CardProductoGeneral";
import { useProductos } from "../../ProductosContext/ProductoProvider";

export function FiltradoProductosPorBusqueda({ searchTerm }) {
  const { productosAll, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    let filteredProducts = productosAll;

    // Filtrar los productos basados en el searchTerm
    const filteredProductos = productosAll.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.nombre
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProductos.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return filteredProductos.map((producto) => (
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
