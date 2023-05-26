import "./CardProductoGeneral.css";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function CardProductoGeneral({ producto, favoritos }) {
  console.log(favoritos);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();
  const {
    getImgPortadaProducto,
    agregarFavorito,
    eliminarFavorito,
    agregarProductoAlCarrito,
    limpiarTerminoBusqueda,
  } = useProductos();

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
      console.error("Error obteniendo la URL de la imagen :", error);
    }
  }

  useEffect(() => {
    obtenerUrlImagenAsync(producto.id);
    // Verificar si el producto está en favoritos y establecer el estado local en consecuencia
    setEsFavorito(esProductoFavorito);
  }, [producto.id, esProductoFavorito]);

  async function agregarAlCarrito() {
    if (usuario && usuario.tipoUsuario === 0) {
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
      if (!usuario || (usuario && usuario.tipoUsuario !== 0)) {
        alert(
          "Solo los usuarios tipo cliente pueden agregar productos al carrito."
        );
      } else {
        navigate("/login");
      }
    }
  }

  async function toggleFavorito() {
    if (usuario && usuario.tipoUsuario === 0) {
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
      if (usuario && usuario.tipoUsuario !== 0) {
        alert("Solo los usuarios tipo cliente pueden agregar a favoritos.");
      } else {
        navigate("/login");
      }
    }
  }

  return (
    <div className="card-producto">
      {producto.stock === 0 && (
        <div className="agotado-label">
          <h4>Agotado</h4>
        </div>
      )}
      <Link
        to={`/productos/detalles/${producto.id}`}
        style={{ textDecoration: "none" }}
        onClick={limpiarTerminoBusqueda}
      >
        <img
          className="card-producto-img"
          src={urlImagen}
          alt={producto.nombre}
        />
        <div className="item-productogeneral-nombre">{producto.nombre}</div>
        <br></br>
        <div>${producto.precio}</div>
      </Link>

      <button
        onClick={toggleFavorito}
        title={esFavorito ? "Eliminar de favoritos" : "Agregar a favoritos"}
      >
        <box-icon
          type="solid"
          name="heart"
          color={esFavorito ? "red" : "#fbf2f2"}
        ></box-icon>
      </button>

      <div className="separateIcon">
        <button onClick={agregarAlCarrito}>
          <box-icon
            name="cart-add"
            type="solid"
            color="white"
            style={{ verticalAlign: "middle" }}
          ></box-icon>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
