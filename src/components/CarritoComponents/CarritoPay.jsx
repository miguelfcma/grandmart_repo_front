import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CarritoPay.css";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";

export function CarritoPay() {
  const {
    carrito,
    obtenerCarritoDeCompras,
    actualizarCantidadProductoEnCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,
    getImgPortadaProducto,
    limpiarCarrito,
  } = useProductos();
  const { crearOrden, verificacionDireccionEnvio } = useOrdenes();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estado local para almacenar las URLs de las imágenes de portada
  const [imgUrls, setImgUrls] = useState({});
  const navigate = useNavigate();
  // Verificar si el usuario ha iniciado sesión antes de obtener el carrito de compras
  useEffect(() => {
    const fetchData = async (userId) => {
      try {
      await obtenerCarritoDeCompras(userId)
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario && usuario.id) {
      fetchData(usuario.id);
    }
  }, []);

  // Obtener las URLs de las imágenes de portada de los productos en el carrito de compras
  useEffect(() => {
    async function obtenerUrlImagenAsync(idProducto) {
      const url = await getImgPortadaProducto(idProducto);
      setImgUrls((prevImgUrls) => ({
        ...prevImgUrls,
        [idProducto]: url,
      }));
    }

    carrito.detalles.forEach((item) => {
      if (!imgUrls[item.producto.id]) {
        obtenerUrlImagenAsync(item.producto.id);
      }
    });
  }, [carrito, imgUrls, getImgPortadaProducto]);

  function getTotal() {
    return carrito.totalCantidad;
  }
  const eliminarItemCarrito = async (item) => {
    await eliminarProductoDelCarrito(item.id_producto, {
      id_usuario: usuario.id,
    });
  };
  const vaciarCarritoCompleto = async () => {
    vaciarCarrito(parseInt(usuario.id));
  };
  const incrementarCantidadItemCarrito = async (item) => {
    await actualizarCantidadProductoEnCarrito(item.id_producto, {
      id_usuario: usuario.id,
      accion: "incrementar",
    });
  };
  const decrementarCantidadItemCarrito = async (item) => {
    await actualizarCantidadProductoEnCarrito(item.id_producto, {
      id_usuario: usuario.id,
      accion: "decrementar",
    });
  };
  const crearOrdenDeCompra = async () => {
    const validation = await verificacionDireccionEnvio(usuario.id);
    console.log(validation);
    if (validation == false) {
      navigate("/informacion-envio");
    } else {
      
      navigate("/resumen-compras");
    }
    //const response = await crearOrden({ id_usuario: usuario.id });
    limpiarCarrito();
  };
  return (
    <div className="cart-table">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.detalles.map((item) => (
            <tr key={item.id_producto}>
              <td>
                <Link
                  to={`/productos/detalles/${item.producto.id}`}
                  style={{ textDecoration: "none" }}
                  title={"Clic para ver más información del producto"}
                >
                  <h5>{item.producto.nombre}</h5>
                  <img
                    className="card-producto-img2"
                    src={imgUrls[item.producto.id] || ""}
                  />{" "}
                  {/* Usamos el estado local para obtener la imagen de portada */}
                </Link>
              </td>
              <td className="prices">$ {item.producto.precio}</td>
              <td className="cart-item-controls2">
                <button onClick={() => decrementarCantidadItemCarrito(item)}>
                  -
                </button>
                <span className="prices">{item.cantidad}</span>
                <button onClick={() => incrementarCantidadItemCarrito(item)}>
                  +
                </button>
              </td>
              <td className="prices">
                $ {item.producto.precio * item.cantidad}
              </td>
              <td>
                <button
                  className="btn-remove"
                  onClick={() => eliminarItemCarrito(item)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <h3>Total: ${getTotal()}</h3>
      </div>
      <div className="cart-actions">
        {carrito.detalles.length === 0 ? (
          <div></div>
        ) : (
          <>
            <button className="btn-empty" onClick={vaciarCarritoCompleto}>
              Vaciar Carrito
            </button>
            <button className="btn-checkout" onClick={crearOrdenDeCompra}>
              Realizar orden de compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}
