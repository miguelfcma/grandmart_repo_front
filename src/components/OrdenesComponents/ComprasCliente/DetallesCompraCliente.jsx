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
export function DetallesCompraCliente({ id_orden }) {
  const {
    obtenerDetalleOrden,
    obtenerDireccionEnvioOrden,
    cancelarOrdenDeCompra,
  } = useOrdenes();

  const navigate = useNavigate();
  const { getImgPortadaProducto } = useProductos();
  const [orden, setOrden] = useState({
    id: null,
    total: null,
    estado_orden: null,
    id_usuario: null,
    createdAt: null,
    fechaEntrega: null,
    detallesOrden: [],
  });
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState(null);
  const [urlImagenes, setUrlImagenes] = useState([]);
  const [infoEnvio, setInfoEnvio] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDetalleOrden(id_orden);
        const data2 = await obtenerDireccionEnvioOrden(id_orden);

        setOrden({
          id: data.orden.id,
          total: data.orden.total,
          estado_orden: data.orden.estado_orden,
          id_usuario: data.orden.id_usuario,
          createdAt: data.orden.createdAt,
          fechaEntrega: data.orden.fechaEntrega,
          detallesOrden: data.detallesOrden,
        });
        setInfoEnvio(data2.envio);
        setDireccionEnvio(data2.direccion_envio);
        setNuevoEstado(data.orden.estado_orden);

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

  const handleVerDetalles = (productoId) => {
    navigate(`/productos/detalles/${productoId}`);
  };

  const handleOpinar = (productoId) => {
    navigate(`/dashClient/compras/detalles/${id_orden}/opinar/${productoId}`);
  };

  const handleCancelarOrdenDeCompra = async () => {
    try {
      const confirmResult = await Swal.fire({
        icon: "question",
        title: "Confirmar cancelación",
        text: "¿Estás seguro de que deseas cancelar la orden de compra?",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "Cancelar",
      });

      if (confirmResult.isConfirmed) {
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

  return (
    <Container className="detalles-orden-Repartidor">
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
          <div>
            <h1 className="infoEnvio-titulo">Envío:</h1>
            <Row className="orden-row">
              <Col md={4}>
                <p>ID envío: {infoEnvio.id}</p>
                <p>Estado envío: {infoEnvio.estado}</p>
              </Col>
              
            </Row>
          </div>

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
      <Button variant="danger" onClick={handleCancelarOrdenDeCompra}>
        Cancelar orden de compra
      </Button>
    </Container>
  );
}
