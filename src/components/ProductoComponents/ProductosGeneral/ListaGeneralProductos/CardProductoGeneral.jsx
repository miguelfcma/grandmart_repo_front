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
    loadFavoritos,
    agregarProductoAlCarrito,
  } = useProductos();

  useEffect(() => {
    if (usuario && usuario.id) {
      loadFavoritos(usuario.id);
    }
  }, []);
  const [esFavorito, setEsFavorito] = useState(false);
  const esProductoFavorito = favoritos.some(
    (favorito) => favorito.id_producto === producto.id
  );

  const [urlImagen, setUrlImagen] = useState("");

  async function obtenerUrlImagenAsync(idProducto) {
    try {
      const url = await getImgPortadaProducto(idProducto);
      setUrlImagen(url);
    } catch (error) {
      // Manejar el error, si es necesario
      console.error("Error obteniendo la URL de la imagen:", error);
    }
  }

  useEffect(() => {
    obtenerUrlImagenAsync(producto.id);
    // Verificar si el producto está en favoritos y establecer el estado local en consecuencia
    setEsFavorito(esProductoFavorito);
  }, [producto.id, esProductoFavorito]);


  async function agregarAlCarrito() {
    if (usuario) {
      try {
        await agregarProductoAlCarrito({
          id_usuario: usuario.id,
          id_producto: producto.id,
          cantidad: 1,
        });
      } catch (error) {
        // Manejar el error, si es necesario
        console.error("Error agregando producto al carrito:", error);
      }
    } else {
      navigate("/login");
    }
  }

  async function toggleFavorito() {
    if (usuario && usuario.id) {
      if (esProductoFavorito) {
        try {
          const favorito = favoritos.find(
            (favorito) => favorito.id_producto === producto.id
          );
          await eliminarFavorito(usuario.id, producto.id);
        } catch (error) {
          // Manejar el error, si es necesario
          console.error("Error eliminando producto de favoritos:", error);
        }
      } else {
        try {
          await agregarFavorito(usuario.id, producto.id);
        } catch (error) {
          // Manejar el error, si es necesario
          console.error("Error agregando producto a favoritos:", error);
        }
      }
      setEsFavorito(!esFavorito);
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
      </Link>
      {usuario && usuario.id ? (
        <button
          onClick={toggleFavorito}
          title={esFavorito ? "Eliminar de favoritos" : "Agregar a favoritos"}
        >
          <box-icon
            type="solid"
            name="heart"
            color={esFavorito ? "red" : "black"}
          ></box-icon>
        </button>
      ) : null}
      <button onClick={agregarAlCarrito}>Agregar al carrito</button>
    </div>
  );
  
      }