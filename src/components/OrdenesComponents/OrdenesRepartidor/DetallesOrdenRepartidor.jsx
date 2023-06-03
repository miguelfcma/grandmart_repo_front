import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import "./DetallesOrdenRepartidor.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export function DetallesOrdenRepartidor({ id_orden }) {
  const {
    obtenerDetalleOrden,
    cambiarEstadoEnvio,
    obtenerDireccionEnvioOrden,
  } = useOrdenes();

  const [orden, setOrden] = useState({
    id: null,
    total: null,
    estado_orden: null,
    id_usuario: null,
    createdAt: null,
    fechaEntrega: null,
    detallesOrden: [],
  });
  const navigate = useNavigate();
  const [direccionEnvio, setDireccionEnvio] = useState(null);
  const [infoEnvio, setInfoEnvio] = useState("");
  const cargarDetalleOrden = async () => {
    try {
      const data = await obtenerDetalleOrden(id_orden);

      setOrden({
        id: data.orden.id,
        total: data.orden.total,
        estado_orden: data.orden.estado_orden,
        id_usuario: data.orden.id_usuario,
        createdAt: data.orden.createdAt,
        fechaEntrega: data.orden.fechaEntrega,
        detallesOrden: data.detallesOrden,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cargarDireccionEnvioOrden = async () => {
    try {
      const data2 = await obtenerDireccionEnvioOrden(id_orden);

      setInfoEnvio(data2.envio);
      setDireccionEnvio(data2.direccion_envio);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    cargarDetalleOrden();
    cargarDireccionEnvioOrden();
  }, []);

  const [opcionSeleccionadaEnvio, setOpcionSeleccionadaEnvio] = useState("");
  const opcionesEnvio = [
    "Pendiente",
    "En tránsito",
    "Entregado",
    "Retrasado",
    "Devuelto",
    "Cancelado",
  ];
  const handleCambioOpcionEnvio = (e) => {
    setOpcionSeleccionadaEnvio(e.target.value);
  };
  const handleCambiarEstadoEnvio = async () => {
    try {
      const confirmResult = await Swal.fire({
        icon: "question",
        title: "Confirmar actualización",
        text: "¿Estás seguro de que deseas cambiar el estado del envío?",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (confirmResult.isConfirmed) {
        const status = await cambiarEstadoEnvio(infoEnvio.id, {
          nuevoEstado: opcionSeleccionadaEnvio,
        });
        if (status === 200) {
          Swal.fire("Éxito", "Estado del envío actualizado", "success");
          cargarDireccionEnvioOrden();
        } else if (status === 404) {
          Swal.fire(
            "Error",
            `El envío con id ${infoEnvio.id} no existe`,
            "error"
          );
        } else if (status === 401) {
          Swal.fire(
            "Error",
            "La orden ya está cancelada y no se puede cambiar su estado",
            "error"
          );
        } else if (status === 402) {
          Swal.fire(
            "Error",
            `El envío ya tiene el estado ${opcionSeleccionadaEnvio} y no se puede cambiar su estado nuevamente`,
            "error"
          );
        } else if (status === 500) {
          Swal.fire("Error", "Error en el servidor", "error");
        }
      }
    } catch (error) {
      console.error("Error al cambiar el estado del envío:", error);
    }
  };
  return (
    <Container className="detalles-orden-Repartidor">
      <div>
        <h1 className="orden-titulo">Orden:</h1>
        <Row className="orden-row">
          <Col md={4}>
            <p>ID: {orden.id}</p>
            <p>Total: {orden.total}</p>
            <p>Estado: {orden.estado_orden}</p>
            <p>ID Usuario: {orden.id_usuario}</p>
          </Col>
          <Col md={4}>
            <p className="fecha-creacion">
              Fecha de Creación:{" "}
              {new Date(orden.createdAt).toLocaleDateString()}
            </p>
          </Col>
        </Row>
      </div>

      {orden.detallesOrden.length > 0 && (
        <div>
          <h1 className="detalles-orden-titulo">Detalles de la Orden:</h1>
          <Table striped bordered responsive className="detalles-orden-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID producto</th>
                <th>Nombre del producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.detallesOrden.map((detalle, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{detalle.producto.id}</td>
                  <td>{detalle.producto.nombre}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precio_unitario}</td>
                  <td>
                    {(detalle.precio_unitario * detalle.cantidad).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div>
            <h1 className="infoEnvio-titulo">Envío:</h1>
            <Row className="orden-row">
              <Col md={4}>
                <p>ID: {infoEnvio.id}</p>
                <p>Estado: {infoEnvio.estado}</p>
              </Col>
              <div>
                <Form.Select
                  value={opcionSeleccionadaEnvio}
                  onChange={handleCambioOpcionEnvio}
                >
                  <option value="">Seleccione un estado</option>
                  {opcionesEnvio.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
                <button
                  onClick={handleCambiarEstadoEnvio}
                  disabled={!opcionSeleccionadaEnvio}
                >
                  Cambiar Estado de Orden
                </button>
              </div>
            </Row>
          </div>

          <h1 className="detalles-orden-titulo">Detalles del envío:</h1>
          {direccionEnvio && (
            <div>
              <Row className="orden-row">
                <Col md={4}>
                  <p>ID: {direccionEnvio.id}</p>
                  <p>Calle: {direccionEnvio.calle}</p>
                  <p>Calle 1: {direccionEnvio.calle1}</p>
                  <p>Calle 2: {direccionEnvio.calle2}</p>
                  <p>Colonia: {direccionEnvio.colonia}</p>
                  <p>Descripción: {direccionEnvio.descripcion}</p>
                  <p>Municipio/Alcaldía: {direccionEnvio.municipio_alcaldia}</p>
                  <p>Nombre INE: {direccionEnvio.nombre_ine}</p>
                  <p>Número Exterior: {direccionEnvio.numeroExterior}</p>
                  <p>Número Interior: {direccionEnvio.numeroInterior}</p>
                  <p>Código Postal: {direccionEnvio.postal}</p>
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
