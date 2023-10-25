//Este archivo se encarga de mostrar el carrito de compras
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import "../HomePageComponents/NavBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Carrito.css";
import { Button } from "react-bootstrap";

//Se utiliza el contexto de productos useProductos para acceder a las funciones y datos relacionados con el carrito de compras
export function Carrito() {
  //El componente utiliza el contexto de useProductos, el carrito y las funciones se destructuran del contexto, es decir, que se extraen valores individuales, del objeto
  const {
    carrito,
    obtenerCarritoDeCompras,
    actualizarCantidadProductoEnCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,
  } = useProductos();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  //Se utiliza el useEffect para cargar el carrito de compras
  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        await obtenerCarritoDeCompras(userId);
      } catch (error) {
        console.error(error);
      }
    };
    //y se verifica si el usuario ha iniciado sesión antes de obtener el carrito de compras
    if (usuario && usuario.id) {
      fetchData(usuario.id);
    }
  }, []);
  //Calcula el total de productos en el carrito
  function getTotal() {
    return carrito.totalCantidad;
  }

  //Funciones asincronas
  //Permite eliminar un producto especifico del carrito
  async function eliminarItemCarrito(item) {
    await eliminarProductoDelCarrito(item.id_producto, {
      id_usuario: usuario.id,
    });
  }
  //Permite vaciar el carrito por completo
  async function vaciarCarritoCompleto() {
    await vaciarCarrito(parseInt(usuario.id));
  }
  //Permite incrementar la cantida de un producto en el carrito
  async function incrementarCantidadItemCarrito(item) {
    await actualizarCantidadProductoEnCarrito(item.id_producto, {
      id_usuario: usuario.id,
      accion: "incrementar",
    });
  }
  //Permite decrementar la cantidad de un producto en el carrito
  async function decrementarCantidadItemCarrito(item) {
    await actualizarCantidadProductoEnCarrito(item.id_producto, {
      id_usuario: usuario.id,
      accion: "decrementar",
    });
  }

  //Renderizado del componente
  return (
    //El componente renderiza un icono de carrito con un contador de productos en el carrito
    <div className="cart-icon-container">
      <box-icon type="solid" name="cart" className="cart-icon"></box-icon>
      {carrito.detalles.length === 0 ? (
        <div></div>
      ) : (
        <div className="cart-count">{carrito.detalles.length}</div>
        //el icono del contador de productos, solo aparece si hay al menos un producto agregado en el carrito
      )}

      <div className="cart-dropdown">
        {carrito.detalles.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.detalles.map((item) => (
              <div key={item.id} className="cart-item">
                {/*Link que redirige a la publicacion del producto haciendo clic en el nombre del producto*/}
                <Link
                  to={`/productos/detalles/${item.producto.id}`}
                  style={{ textDecoration: "none" }}
                  type="button"
                >
                  <div className="cart-item-info">
                    <h3>{item.producto.nombre}</h3>
                    <p>Precio: $ {item.producto.precio} MXN</p>
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
            <p>Total: $ {getTotal()} MXN</p>
            <div className="cart-actions">
              <Button
                variant="danger"
                className="btn-empty"
                onClick={vaciarCarritoCompleto}
              >
                Vaciar carrito
              </Button>
              {/*Link que redirige al apartado de pagar el carrito*/}
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
