import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";
import { Link } from "react-router-dom";

export function Carrito() {
  const {
    carrito,
    eliminarItemCarrito,
    vaciarCarrito,
    incrementarCantidadItemCarrito,
    decrementarCantidadItemCarrito,
  } = useProductos();

  function getTotal() {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }

  return (
    <div className="cart-icon-container">
      <box-icon type="solid" name="cart" className="cart-icon"></box-icon>
      {carrito.length === 0 ? (
            <div></div>
          ) : (
            <div className="cart-count">{carrito.length}</div>
          )}
      
      <div className="cart-dropdown">
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>
                  <p>Precio: ${item.precio}</p>
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
              <button onClick={vaciarCarrito}>Vaciar carrito</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
