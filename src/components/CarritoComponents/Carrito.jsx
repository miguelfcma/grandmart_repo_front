import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Carrito.css";
import { Button } from "react-bootstrap";
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
    const fetchData = async (userId) => {
      try {
        await obtenerCarritoDeCompras(userId);
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario && usuario.id) {
      fetchData(usuario.id);
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
                <Link
                  to={`/productos/detalles/${item.producto.id}`}
                  style={{ textDecoration: "none" }}
                  type="button"
                >
                  <div className="cart-item-info">
                    <h3>{item.producto.nombre}</h3>
                    <p>Precio: ${item.producto.precio} MXN</p>
                  </div>
                </Link>
                <div className="cart-item-controls">
                  <div className="btn-item-control-cantidad">
                    {" "}
                    <Button
                      className="btnMenos"
                      onClick={() => decrementarCantidadItemCarrito(item)}
                    >
                      -
                    </Button>
                    <span>{item.cantidad}</span>
                    <Button
                      className="btnMas"
                      onClick={() => incrementarCantidadItemCarrito(item)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    className="btnDelete"
                    onClick={() => eliminarItemCarrito(item)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
            <p>Total: ${getTotal()} MXN</p>
            <div className="cart-actions">
              <Button
                variant="danger"
                className="btn-empty"
                onClick={vaciarCarritoCompleto}
              >
                Vaciar carrito
              </Button>

              <Link
                to="/carrito-compras"
                style={{ textDecoration: "none" }}
                className="btnpagar"
                type="button"
              >
                <span>Ver carrito</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
