import "./CardProducto.css";
import { useProductos } from "./ProductosContext/ProductoProvider";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

async function obtenerUrlImagen(idProducto) {
  const response = await fetch(`/api/productos/${idProducto}/imagen`);
  const data = await response.json();
  return data.url;
}

export function CardProducto({ producto }) {
  const { deleteProducto, getImgProducto } = useProductos();

  const [urlImagen, setUrlImagen] = useState("");

  async function obtenerUrlImagenAsync(idProducto) {
    const url = await getImgProducto(idProducto);
    setUrlImagen(url);
  }

  useEffect(() => {
    obtenerUrlImagenAsync(producto.id);
  }, [producto.id]);

  return (
    <div className="card-producto">
      <div>ID: {producto.id}</div>
      <div>Nombre: {producto.nombre}</div>
      <img
        className="card-producto-img"
        src={urlImagen}
        alt={producto.nombre}
      />
      <div>Precio: ${producto.precio}</div>
      
      <Link to={`/dashAdmin/productos/ver/:${producto.id}`} style={{ textDecoration: "none" }}>
        <button className="card-producto">
          <span>Ver producto</span>
          </button>
      </Link>

      <button
        className="card-producto"
        onClick={() => deleteProducto(producto.id)}
      >
        Eliminar producto
      </button>
    </div>
  );
}
