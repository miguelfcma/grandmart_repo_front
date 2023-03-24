import "./CardProducto.css";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";

export function CardProducto({ producto }) {
  const {
    getImgPortadaProducto,
    agregarFavorito,
    eliminarFavorito,
    favoritos,
    carrito,
    agregarItemCarrito,
  } = useProductos();
  const [urlImagen, setUrlImagen] = useState("");
  const esFavorito = favoritos.some((p) => p.id === producto.id);
  const esProductoEnCarrito = carrito.some((p) => p.id === producto.id);
  async function obtenerUrlImagenAsync(idProducto) {
    const url = await getImgPortadaProducto(idProducto);
    setUrlImagen(url);
  }

  useEffect(() => {
    obtenerUrlImagenAsync(producto.id);
  }, [producto.id]);

  function toggleFavorito() {
    if (esFavorito) {
      eliminarFavorito(producto);
    } else {
      agregarFavorito(producto);
    }
  }
  function agregarAlCarrito() {
    agregarItemCarrito(producto);
  }

  return (
    <div className="card-producto">
      <img
        className="card-producto-img"
        src={urlImagen}
        alt={producto.nombre}
      />
      <div>Nombre: {producto.nombre}</div>
      <div>Precio: ${producto.precio}</div>
      <button
        onClick={toggleFavorito}
        title={esFavorito ? "Eliminar de favoritos" : "Agregar a favoritos"}
      >
        <box-icon
          type="solid"
          name="heart"
          color={esFavorito ? "red" : "white"}
        ></box-icon>
      </button>
      <button
        onClick={agregarAlCarrito}
        disabled={esProductoEnCarrito}
        title={esProductoEnCarrito ? "Ya está en el carrito" : "Agregar al carrito"}
      >
        {esProductoEnCarrito ? "Agregado al carrito" : "Agregar al carrito"}
      </button>
    </div>
  );
}
