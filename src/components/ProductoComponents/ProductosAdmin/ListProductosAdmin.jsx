import { useEffect } from "react";
import { CardProductoAdmin } from "./CardProductoAdmin";
import "./ListProductosAdmin.css";
import { useProductos } from "../ProductosContext/ProductoProvider";

export function ListProductosAdmin() {
  const { productos, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    if (productos.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return productos.map((producto) => (
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
