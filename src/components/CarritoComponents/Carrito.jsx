import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";

export function Carrito() {
  const {
    carrito,
    eliminarItemCarrito,
    vaciarCarrito,
    incrementarCantidadItemCarrito,
    decrementarCantidadItemCarrito,
  } = useProductos();

  function getTotal() {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  return (
<div className="cart-icon-container">
  <box-icon type='solid' name='cart' class="cart-icon"></box-icon>
  <div class="cart-count">{carrito.length}</div>


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
                  <button onClick={() => incrementarCantidadItemCarrito(item)}>+</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => decrementarCantidadItemCarrito(item)}>-</button>
                  <button onClick={() => eliminarItemCarrito(item)}>Eliminar</button>
                </div>
              </div>
            ))}
            <p>Total: ${getTotal()}</p>
            <div className="cart-actions">
              <button onClick={vaciarCarrito}>Vaciar carrito</button>
              &nbsp;
              <button>Pagar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}