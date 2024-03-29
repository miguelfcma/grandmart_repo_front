//Este archivo es para la parte de interfaz de pagar el carrito

import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Image, Button } from "react-bootstrap";
import "./CarritoPay.css";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";

export function CarritoPay() {
  //Se utiliza el contexto useProductos para acceder a las funciones que se observan de la linea 12 a la 19
  const {
    carrito,
    obtenerCarritoDeCompras,
    actualizarCantidadProductoEnCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,
    getImgPortadaProducto,
    limpiarCarrito,
  } = useProductos();
  //Se utiliza el contexto useOrdenes para obtener la direccion de envio del usuario quien quiere proceder a pagar el carrito
  const { verificacionDireccionEnvio } = useOrdenes();

  //Se recupera la informacion del usuario, para verificar si ha iniciado sesion y obetener su id para realizar sus operaciones
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estado local para almacenar las URLs de las imágenes de portada
  const [imgUrls, setImgUrls] = useState({});

  //Hook useNavigate para redirigir al usuario a diferentes rutas, segun el estado y acciones del carrito
  const navigate = useNavigate();

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
      //Las imagenes se almacenan en una estado local "imgUrls" para mostrar las imagenes con los productos en la tabla carrito
  }, [carrito, imgUrls, getImgPortadaProducto]);

  //Cantidad total a pagar del carrito, se calcula sumando todos los subtotales de cada producto
  function getTotal() {
    return carrito.totalCantidad;
  }
  //Funciones de acciones para el carrito
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
    const status = await verificacionDireccionEnvio(usuario.id);

    if (status === 400) {
      navigate("/informacion-envio");
    } else if (status === 200) {
      navigate("/resumen-compras");
    }
    limpiarCarrito();
  };

  return (
    <div className="cart-table">
      <div className="cart-table-contenedor">
        <Table>
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
                    <Image
                      className="card-producto-img2"
                      src={imgUrls[item.producto.id] || ""}
                    />{" "}
                    {/* Se usa el estado local para obtener la imagen de portada */}
                  </Link>
                </td>
                <td className="prices">$ {item.producto.precio}</td>
                <td>
                  <div className="cart-item-controls2">
                    <Button
                      variant="primary"
                      onClick={() => decrementarCantidadItemCarrito(item)}
                    >
                      -
                    </Button>
                    <span className="prices">{item.cantidad}</span>
                    <Button
                      variant="primary"
                      onClick={() => incrementarCantidadItemCarrito(item)}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="prices">
                  $ {item.producto.precio * item.cantidad} MXN
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => eliminarItemCarrito(item)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="cart-total">
        <h3>Total: ${getTotal()} MXN</h3>
      </div>
      <div className="cart-actions">
        {carrito.detalles.length === 0 ? (
          <div></div>
        ) : (
          <>
            <Button variant="danger" onClick={vaciarCarritoCompleto}>
              Vaciar Carrito
            </Button>
            <Button variant="success" onClick={crearOrdenDeCompra}>
              Realizar orden de compra
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
