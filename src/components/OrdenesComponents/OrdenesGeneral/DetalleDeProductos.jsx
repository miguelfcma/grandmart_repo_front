import { useProductos } from "../../ProductoComponents/ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";

export function DetalleDeProductos() {
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
  }, [carrito, imgUrls, getImgPortadaProducto]);
  return (
    <Container>
      <h1>Detalles de mi compra</h1>

      <div className="cart-table">
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
                    <Button variant="primary" className="mr-3">
                      Continuar comprando
                    </Button>
                    <Button variant="primary" className="mr-3">
                      Ver carrito de compra
                    </Button>
                    <Button variant="success">Proceder al pago</Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}