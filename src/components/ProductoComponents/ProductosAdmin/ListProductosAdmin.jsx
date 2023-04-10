import { useEffect } from "react";
import { CardProductoAdmin } from "./CardProductoAdmin";
import "./ListProductosAdmin.css";
import { useProductos } from "../ProductosContext/ProductoProvider";

export function ListProductosAdmin() {
  const { productosAll, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    if (productosAll.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return productosAll.map((producto) => (
        <CardProductoAdmin key={producto.id} producto={producto} />
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
