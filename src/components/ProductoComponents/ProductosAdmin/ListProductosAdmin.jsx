import { useEffect, useState } from "react";
import { CardProductoAdmin } from "./CardProductoAdmin";
import "./ListProductosAdmin.css";
import { useProductos } from "../ProductosContext/ProductoProvider";

export function ListProductosAdmin() {
  const { productosAll, loadProductos } = useProductos();

  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    loadProductos();
  }, []);

  function filtrarProductos() {
    if (filtro === "") {
      return productosAll;
    } else {
      const filtroLowerCase = filtro.toLowerCase();

      return productosAll.filter((producto) => {
        const id = producto.id.toString().toLowerCase();
        const idUsuario = producto.id_usuario.toString().toLowerCase();
        const nombre = producto.nombre.toLowerCase();
        const descripcion = producto.descripcion.toLowerCase();
        const marca = producto.marca.toLowerCase();
        const modelo = producto.modelo.toLowerCase();

        return (
          id.includes(filtroLowerCase) ||
          idUsuario.includes(filtroLowerCase) ||
          nombre.includes(filtroLowerCase) ||
          descripcion.includes(filtroLowerCase) ||
          marca.includes(filtroLowerCase) ||
          modelo.includes(filtroLowerCase) ||
          `${id} ${nombre}`.includes(filtroLowerCase) ||
          `${id} - ${nombre}`.includes(filtroLowerCase) ||
          `${id}-${nombre} `.includes(filtroLowerCase) ||
          `${nombre} ${marca}`.includes(filtroLowerCase) ||
          `${nombre} ${modelo}`.includes(filtroLowerCase) ||
          `${marca} ${modelo}`.includes(filtroLowerCase)
        );
      });
    }
  }

  function renderMain() {
    const productosFiltrados = filtrarProductos();

    if (productosFiltrados.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return productosFiltrados.map((producto) => (
        <CardProductoAdmin key={producto.id} producto={producto} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de productos:</h2>
      <input
        type="text"
        placeholder="Buscar por ID, ID del usuario, nombre, descripción, marca o modelo"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="bordeFiltro"
      />
      <div className="list-productos">{renderMain()}</div>
    </>
  );
}
