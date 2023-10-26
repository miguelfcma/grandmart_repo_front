import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { Container, Row, Col, Button, Card, ListGroup, Image } from "react-bootstrap";
import { useProductos } from "../../ProductoComponents/ProductosContext/ProductoProvider";
import { useNavigate } from "react-router-dom";

// Definición del componente "DetallesCompraAdmin"
export function DetallesCompraAdmin({ id_orden }) {
  // Obtiene funciones del contexto de órdenes
  const { obtenerDetalleOrden, obtenerDireccionEnvioOrden, cancelarOrdenDeCompra } = useOrdenes();

  // Obtiene la función de navegación de React Router
  const navigate = useNavigate();

  // Obtiene la función para obtener la imagen de portada del producto del contexto de productos
  const { getImgPortadaProducto } = useProductos();

  // Estados locales para almacenar la información de la orden, la dirección de envío y las URLs de imágenes
  const [orden, setOrden] = useState({
    id: null,
    total: null,
    estado_orden: null,
    id_usuario: null,
    createdAt: null,
    fechaEntrega: null,
    detallesOrden: [],
  });
  const [direccionEnvio, setDireccionEnvio] = useState(null);
  const [urlImagenes, setUrlImagenes] = useState([]);

  // Efecto de useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Función para obtener datos de la orden, detalles de la orden y dirección de envío
    const fetchData = async () => {
      try {
        const data = await obtenerDetalleOrden(id_orden);
        const data2 = await obtenerDireccionEnvioOrden(id_orden);

        // Almacena la información de la orden y detalles de la orden en el estado
        setOrden({
          id: data.orden.id,
          total: data.orden.total,
          estado_orden: data.orden.estado_orden,
          id_usuario: data.orden.id_usuario,
          createdAt: data.orden.createdAt,
          fechaEntrega: data.orden.fechaEntrega,
          detallesOrden: data.detallesOrden,
        });
        
        // Almacena la dirección de envío en el estado
        setDireccionEnvio(data2.direccion_envio);

        // Obtiene las URLs de las imágenes de los productos
        const promisesImagenes = data.detallesOrden.map(async (detalle) => {
          const url = await getImgPortadaProducto(detalle.producto.id);
          return url;
        });
        const urlsImagenes = await Promise.all(promisesImagenes);
        setUrlImagenes(urlsImagenes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Función para ver los detalles de un producto
  const handleVerDetalles = (productoId) => {
    navigate(`/productos/detalles/${productoId}`);
  };

  // Función para opinar sobre un producto
  const handleOpinar = (productoId) => {
    navigate(`/dashClient/compras/opinar/${productoId}`);
  };

  // Función para cancelar la orden de compra
  const handleCancelarOrdenDeCompra = async () => {
    try {
      await cancelarOrdenDeCompra(orden.id);
    } catch (error) {
      console.error("Error al eliminar orden", error);
    }
  };

  // Renderiza el componente
  return (
    <Container className="detalles-orden-admin">
      {orden.detallesOrden.length > 0 && (
        <div>
          <h1 className="detalles-orden-titulo">Detalles de la compra:</h1>
          <Row xs={1} md={2} className="g-4">
            {orden.detallesOrden.map((detalle, index) => (
              <Col key={index}>
                <Card>
                  <Card.Header>{detalle.producto.nombre}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Image src={urlImagenes[index]} fluid />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      ID producto: {detalle.producto.id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Cantidad: {detalle.cantidad}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Precio Unitario: {detalle.precio_unitario}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Subtotal:{" "}
                      {(detalle.precio_unitario * detalle.cantidad).toFixed(2)}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Footer>
                    <Button
                      variant="primary"
                      onClick={() => handleVerDetalles(detalle.producto.id)}
                    >
                      Ver detalles
                    </Button>{" "}
                    <Button
                      variant="success"
                      onClick={() => handleOpinar(detalle.producto.id)}
                    >
                      Opinar
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {direccionEnvio && (
            <Card>
              <h1 className="detalles-orden-titulo">Detalles del envío:</h1>
              <Row className="orden-row">
                <Col md={4}>
                  <Card.Text>ID: {direccionEnvio.id}</Card.Text>
                  <Card.Text>Calle: {direccionEnvio.calle}</Card.Text>
                  <Card.Text>Calle 1: {direccionEnvio.calle1}</Card.Text>
                  <Card.Text>Calle 2: {direccionEnvio.calle2}</Card.Text>
                  <Card.Text>Colonia: {direccionEnvio.colonia}</Card.Text>
                  <Card.Text>Descripción: {direccionEnvio.descripcion}</Card.Text>
                  <Card.Text>Municipio/Alcaldía: {direccionEnvio.municipio_alcaldia}</Card.Text>
                  <Card.Text>Nombre INE: {direccionEnvio.nombre_ine}</Card.Text>
                  <Card.Text>Número Exterior: {direccionEnvio.numeroExterior}</Card.Text>
                  <Card.Text>Número Interior: {direccionEnvio.numeroInterior}</Card.Text>
                  <Card.Text>Código Postal: {direccionEnvio.postal}</Card.Text>
                </Col>
              </Row>
            </Card>
          )}
        </div>
      )}
      <Button variant="danger" onClick={handleCancelarOrdenDeCompra}>
        Cancelar orden de compra
      </Button>
    </Container>
  );
}
