import { useEffect } from "react";
import { CardProductoCliente } from "./CardProductoCliente";
import { useProductos } from "../ProductosContext/ProductoProvider";

export function ListProductosCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { productosUsuario, loadProductosUsuario } = useProductos();

  useEffect(() => {
    async function fetchData() {
      try {
        await loadProductosUsuario(usuario.id);
      } catch (error) {
        console.log("Error al cargar los productos:", error);
      }
    }
    fetchData();
  }, []);

  function renderMain() {
    if (productosUsuario.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return productosUsuario.map((producto) => (
        <CardProductoCliente key={producto.id} producto={producto} />
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
