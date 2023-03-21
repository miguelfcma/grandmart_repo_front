import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";

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
    <div>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id}>
              <h3>{item.nombre}</h3>
              <p>Precio: ${item.precio}</p>
              <p>Cantidad: {item.cantidad}</p>
              <button onClick={() => incrementarCantidadItemCarrito(item)}>+</button>
              <button onClick={() => decrementarCantidadItemCarrito(item)}>-</button>
              <button onClick={() => eliminarItemCarrito(item)}>Eliminar</button>
            </div>
          ))}
          <p>Total: ${getTotal()}</p>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </>
      )}
    </div>
  );
}
