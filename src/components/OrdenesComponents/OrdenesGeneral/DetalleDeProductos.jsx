import { useProductos } from "../../ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";
import "./DetalleDeProductos.css";
export function DetalleDeProductos({ enviarDetallesCarrito }) {
  const { carrito, obtenerCarritoDeCompras, getImgPortadaProducto } =
    useProductos();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [imgUrls, setImgUrls] = useState({});
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


    const totalCarrito = carrito.totalCantidad;
        const descripcionProductos = carrito.detalles
          .map((item) => item.producto.nombre)
          .join(", ");
          

          const detallesCarrito = {
            descripcion: descripcionProductos,
            total: totalCarrito
          };
          enviarDetallesCarrito(detallesCarrito);
  }, [carrito, imgUrls, getImgPortadaProducto]);
  return (
    <Container className="contenedor-productos-detalles">
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Detalles de la compra
      </h1>

      <Table className="white-bg cart-table">
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
                  {/* Usamos el estado local para obtener la imagen de portada */}
                </Link>
              </td>
              <td className="prices">$ {item.producto.precio}</td>
              <td className="cart-item-controls2">
                <span className="prices">{item.cantidad}</span>
              </td>
              <td className="prices">
                $ {item.producto.precio * item.cantidad}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="cart-total">
        <h3>Total: ${carrito.totalCantidad}</h3>
      </div>
      <div className="cart-actions">
        {carrito.detalles.length === 0 ? (
          <div></div>
        ) : (
          <>
            <div className="cart-actions">
              {carrito.detalles.length === 0 ? (
                <div></div>
              ) : (
                <>
                  <Link
                    to={`/carrito-compras`}
                    style={{ textDecoration: "none" }}
                    title={"Clic para ver más información del producto"}
                  >
                    <Button
                      variant="primary"
                      className="btn-ver-carrito bg-secondary border-0"
                    >
                      Editar carrito de compra
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
