import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CarritoPay() {
  const {
    carrito,
    getImgPortadaProducto,
    eliminarItemCarrito,
    incrementarCantidadItemCarrito,
    decrementarCantidadItemCarrito,
  } = useProductos();
  
  const [imgUrls, setImgUrls] = useState({});

  useEffect(() => {
    async function obtenerUrlImagenAsync(idProducto) {
      const url = await getImgPortadaProducto(idProducto);
      setImgUrls((prevImgUrls) => ({
        ...prevImgUrls,
        [idProducto]: url,
      }));
    }

    carrito.forEach((item) => {
      if (!imgUrls[item.id]) {
        obtenerUrlImagenAsync(item.id);
      }
    });
  }, [carrito]);

  function getTotal() {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }

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
        {carrito.map((item) => (
          <tr key={item.id}>
            <td>
              <Link to={`/productos/detalles/${item.id}`} style={{ textDecoration: "none" }}>
                <img className="card-producto-img2" src={imgUrls[item.id] || ""} />
                <h3>{item.nombre}</h3>
              </Link>
            </td>
            <td>${item.precio}</td>
            <td className="cart-item-controls2">
              <button onClick={() => decrementarCantidadItemCarrito(item)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => incrementarCantidadItemCarrito(item)}>+</button>
            </td>
            <td>${item.precio * item.cantidad}</td>
            <td>
              <button onClick={() => eliminarItemCarrito(item)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>Total: ${getTotal()}</p>
    <div className="cart-actions2">
      <button>Pagar</button>
    </div>
  </div>
  );
}
