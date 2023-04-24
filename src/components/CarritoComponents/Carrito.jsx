import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Carrito.css";

export function Carrito() {
  const {
    carrito,
    obtenerCarritoDeCompras,
    actualizarCantidadProductoEnCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,
  } = useProductos();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Verificar si el usuario ha iniciado sesión antes de obtener el carrito de compras
  useEffect(() => {
    if (usuario && usuario.id) {
      obtenerCarritoDeCompras(usuario.id);
    }
  }, []);

  function getTotal() {
    return carrito.totalCantidad;
  }

  async function eliminarItemCarrito(item) {
    await eliminarProductoDelCarrito(item.id_producto, {
      id_usuario: usuario.id,
    });
  }

  async function vaciarCarritoCompleto() {
    await vaciarCarrito(parseInt(usuario.id));
  }

  async function incrementarCantidadItemCarrito(item) {
    await actualizarCantidadProductoEnCarrito(item.id_producto, {
      id_usuario: usuario.id,
      accion: "incrementar",
    });
  }

  async function decrementarCantidadItemCarrito(item) {
    await actualizarCantidadProductoEnCarrito(item.id_producto, {
      id_usuario: usuario.id,
      accion: "decrementar",
    });
  }
  return (
    <div className="cart-icon-container">
      {/* Renderizar el icono del carrito y la cantidad de items en el carrito */}
      <box-icon type="solid" name="cart" className="cart-icon"></box-icon>
      {carrito.detalles.length === 0 ? (
        <div></div>
      ) : (
        <div className="cart-count">{carrito.detalles.length}</div>
      )}

      <div className="cart-dropdown">
        {carrito.detalles.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.detalles.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.producto.nombre}</h3>
                  <p>Precio: ${item.producto.precio}</p>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => incrementarCantidadItemCarrito(item)}>
                    +
                  </button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => decrementarCantidadItemCarrito(item)}>
                    -
                  </button>
                  <button onClick={() => eliminarItemCarrito(item)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <p>Total: ${getTotal()}</p>
            <div className="cart-actions">
              <button onClick={vaciarCarritoCompleto}>Vaciar carrito</button>

              <Link
                to="/resumen-compras"
                style={{ textDecoration: "none" }}
                className="btnpagar"
                type="button"
              >
                <span>Pagar</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
