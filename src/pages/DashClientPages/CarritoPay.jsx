import { useProductos } from "../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function CarritoPay(producto) {
    const {
      carrito,
      getImgPortadaProducto,
      eliminarItemCarrito,
      incrementarCantidadItemCarrito,
      decrementarCantidadItemCarrito,
    } = useProductos();

    const [urlImagen, setUrlImagen] = useState("");
    async function obtenerUrlImagenAsync(idProducto) {
      const url = await getImgPortadaProducto(idProducto);
      setUrlImagen(url);
    }

    useEffect(() => {
      obtenerUrlImagenAsync(producto.id);
    }, [producto.id]);

    function getTotal() {
      return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }

    return (
        <>
          {carrito.map((item) => (
            
            <div key={item.id} className="cart-item2">
              <div className="cart-item-info">
              <Link to={`/productos/detalles/${producto.id}`} style={{ textDecoration: "none" }}>
              <img
              className="card-producto-img2"
              src={urlImagen}
              />
                <h3>{item.nombre}</h3>
              </Link>
                <p>Precio: ${item.precio}</p>
              </div>
              <div className="cart-item-controls2">
                <button onClick={() => incrementarCantidadItemCarrito(item)}>+</button>
                <span>{item.cantidad}</span>
                <button onClick={() => decrementarCantidadItemCarrito(item)}>-</button>
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