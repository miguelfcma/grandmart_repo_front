import "./CardProductoGeneral.css";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function CardProductoGeneral({ producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();
  const {
    getImgPortadaProducto,
    agregarFavorito,
    eliminarFavorito,
    favoritos,
    carrito,
    agregarItemCarrito,
  } = useProductos();

  const esFavorito = favoritos.some((p) => p.id === producto.id);
  const esProductoEnCarrito = carrito.some((p) => p.id === producto.id);
  
  const [urlImagen, setUrlImagen] = useState("");
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
      if (usuario) {
        agregarFavorito(producto);
      } else {
        navigate("/login");
      }
    }
  }
  function agregarAlCarrito() {
    if (usuario) {
      agregarItemCarrito(producto);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="card-producto">
      <Link
        to={`/productos/detalles/${producto.id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          className="card-producto-img"
          src={urlImagen}
          alt={producto.nombre}
        />
        <div>{producto.nombre}</div>
        <br></br>
        <div>${producto.precio}</div>
        <div>{producto.usuario.nombre}</div>
      </Link>

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
        title={
          esProductoEnCarrito ? "Ya está en el carrito" : "Agregar al carrito"
        }
      >
        {esProductoEnCarrito ? "Agregado al carrito" : "Agregar al carrito"}
      </button>
    </div>
  );
}
