import { useProductos } from "../../components/ProductoComponents/ProductosContext/ProductoProvider";
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
    <>
      {carrito.map((item) => (
        <div key={item.id} className="cart-item2">
          <div className="cart-item-info">
            <Link
              to={`/productos/detalles/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                className="card-producto-img2"
                src={imgUrls[item.id] || ""}
              />
              <h3>{item.nombre}</h3>
            </Link>
            <p>Precio: ${item.precio}</p>
          </div>
          <div className="cart-item-controls2">
            <button onClick={() => incrementarCantidadItemCarrito(item)}>
              +
            </button>
            <span>{item.cantidad}</span>
            <button onClick={() => decrementarCantidadItemCarrito(item)}>
              -
            </button>
            <button onClick={() => eliminarItemCarrito(item)}>Eliminar</button>
          </div>
        </div>
      ))}
      <p>Total: ${getTotal()}</p>
      <div className="cart-actions2">
        <button>Pagar</button>
      </div>
    </>
  );
}
