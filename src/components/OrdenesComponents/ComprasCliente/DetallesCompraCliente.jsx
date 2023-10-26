// Importación de módulos y componentes de React
import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useProductos } from "../../ProductoComponents/ProductosContext/ProductoProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../OrdenesComponents/ComprasCliente/DetallesComprasCliente.css";

// Definición del componente "DetallesCompraCliente"
export function DetallesCompraCliente({ id_orden }) {
  // Obtención de funciones y datos relacionados con las órdenes y productos
  const {
    obtenerDetalleOrden,
    obtenerDireccionEnvioOrden,
    cancelarOrdenDeCompra,
  } = useOrdenes();
  const navigate = useNavigate();
  const { getImgPortadaProducto } = useProductos();

  // Estado local para almacenar información de la orden
  const [orden, setOrden] = useState({
    id: null,
    total: null,
    estado_orden: null,
    id_usuario: null,
    createdAt: null,
    fechaEntrega: null,
    detallesOrden: [],
  });

  // Estado local para el nuevo estado de la orden (cancelación)
  const [nuevoEstado, setNuevoEstado] = useState("");

  // Estado local para la dirección de envío
  const [direccionEnvio, setDireccionEnvio] = useState(null);

  // Estado local para las URL de las imágenes de los productos
  const [urlImagenes, setUrlImagenes] = useState([]);

  // Estado local para la información de envío
  const [infoEnvio, setInfoEnvio] = useState("");

  // Efecto de useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Función asincrónica para obtener información de la orden
    const fetchData = async () => {
      try {
        const data = await obtenerDetalleOrden(id_orden);
        const data2 = await obtenerDireccionEnvioOrden(id_orden);

        // Actualiza el estado con los datos de la orden
        setOrden({
          id: data.orden.id,
          total: data.orden.total,
          estado_orden: data.orden.estado_orden,
          id_usuario: data.orden.id_usuario,
          createdAt: data.orden.createdAt,
          fechaEntrega: data.orden.fechaEntrega,
          detallesOrden: data.detallesOrden,
        });

        // Actualiza la información de envío y dirección de envío
        setInfoEnvio(data2.envio);
        setDireccionEnvio(data2.direccion_envio);
        setNuevoEstado(data.orden.estado_orden);

        // Obtiene las URL de las imágenes de los productos
        const promisesImagenes = data.detallesOrden.map(async (detalle) => {
          const url = await getImgPortadaProducto(detalle.producto.id);
          console.log(url);
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

  // Función para ver detalles de un producto
  const handleVerDetalles = (productoId) => {
    navigate(`/productos/detalles/${productoId}`);
  };

  // Función para ir a la página de opinión sobre un producto
  const handleOpinar = (productoId) => {
    navigate(`/dashClient/compras/detalles/${id_orden}/opinar/${productoId}`);
  };

  // Función para cancelar una orden de compra
  const handleCancelarOrdenDeCompra = async () => {
    try {
      // Muestra una ventana emergente de confirmación
      const confirmResult = await Swal.fire({
        icon: "question",
        title: "Confirmar cancelación",
        text: "¿Estás seguro de que deseas cancelar la orden de compra?",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "Cancelar",
      });

      if (confirmResult.isConfirmed) {
        // Realiza la cancelación de la orden y maneja posibles respuestas
        const status = await cancelarOrdenDeCompra(orden.id);
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: "Orden cancelada",
            text: "La orden de compra se ha cancelado exitosamente",
          });
        } else if (status === 401) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "La orden ya está cancelada y no se puede cambiar su estado",
          });
        } else if (status === 402) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "La orden no está en estado 'Pendiente' y no se puede cancelar",
          });
        } else if (status === 403) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El envío no está en estado 'Pendiente' y no se puede cancelar",
          });
        } else if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "La orden de compra no se encontró o no existe",
          });
        } else if (status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error en el servidor",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al cancelar la orden de compra",
          });
        }
      }
    } catch (error) {
      console.error("Error al eliminar orden", error);
    }
  };

  // Renderiza la información de la orden y los productos
  return (
    <Container className="detalles-orden-Repartidor">
      {orden.detallesOrden.length > 0 && (
        <div>
          <h1 className="detalles-orden-titulo">Detalles de la compra:</h1>
          <Row xs={1} md={2} className="g-4">
            {orden.detallesOrden.map((detalle, index) => (
              <Col key={index}>
                <Card className="producto-card">
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
                      Precio Unitario: $ {detalle.precio_unitario} MXN
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Subtotal: $ {(detalle.precio_unitario * detalle.cantidad).toFixed(2)} MXN
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
          <div>
            <br></br>
            <br></br>
            <h2 className="infoEnvio-titulo">Envío:</h2>
            <Row className="orden-row">
              <Col md={4}>
                <p>ID envío: {infoEnvio.id}</p>
                <p>Estado envío: {infoEnvio.estado}</p>
              </Col>
            </Row>
          </div>

          {direccionEnvio && (
            <Card className="card-det-envio">
              <h1 className="detalles-orden-envio">Dirección del envío:</h1>
              <Row className="orden-row">
                <Col md={4}>
                  <Card.Text>ID: {direccionEnvio.id}</Card.Text>
                  <Card.Text>Calle: {direccionEnvio.calle}</Card.Text>
                  <Card.Text>Calle 1: {direccionEnvio.calle1}</Card.Text>
                  <Card.Text>Calle 2: {direccionEnvio.calle2}</Card.Text>
                  <Card.Text>Colonia: {direccionEnvio.colonia}</Card.Text>
                  <Card.Text>
                    Descripción: {direccionEnvio.descripcion}
                  </Card.Text>
                  <Card.Text>
                    Municipio/Alcaldía: {direccionEnvio.municipio_alcaldia}
                  </Card.Text>
                  <Card.Text>Nombre INE: {direccionEnvio.nombre_ine}</Card.Text>
                  <Card.Text>
                    Número Exterior: {direccionEnvio.numeroExterior}
                  </Card.Text>
                  <Card.Text>
                    Número Interior: {direccionEnvio.numeroInterior}
                  </Card.Text>
                  <Card.Text>Código Postal: {direccionEnvio.postal}</Card.Text>
                </Col>
              </Row>
            </Card>
          )}
        </div>
      )}
      <br></br>
      <Button variant="danger" onClick={handleCancelarOrdenDeCompra}>
        Cancelar orden de compra
      </Button>
    </Container>
  );
}
