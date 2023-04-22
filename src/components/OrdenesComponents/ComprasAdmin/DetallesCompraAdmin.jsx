import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import {
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  DropdownButton,
  Button,
  Alert, // Agregar el componente de Alert de Bootstrap
} from "react-bootstrap";


export function DetallesCompraAdmin({ id_orden }) {
  const {
    obtenerDetalleOrden,
    actualizarEstadoOrden,
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
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState(null);
  const [estadoModificable, setEstadoModificable] = useState(true);
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false); // Agregar nueva variable de estado para mostrar advertencia


  console.log(orden)
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
        setDireccionEnvio(data2.direccion_envio);
        setNuevoEstado(data.orden.estado_orden);
        setEstadoModificable(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEstadoChange = (estado) => {
    setNuevoEstado(estado);
    if (estado === "entregado" || estado === "cancelado") {
      setEstadoModificable(false);
      setMostrarAdvertencia(true); // Mostrar advertencia al cambiar a "Entregado" o "Cancelado"
    } else {
      setEstadoModificable(true);
      setMostrarAdvertencia(false); // Ocultar advertencia al cambiar a otro estado
    }
  };

  const actualizarEstado = async () => {
    try {
      const ordenActualizada = await actualizarEstadoOrden(id_orden, { estado_orden: nuevoEstado });
      setOrden({ ...orden, estado_orden: ordenActualizada.estado_orden,  ordenActualizada: ordenActualizada.fechaEntrega});
    } catch (error) {
      console.error(error);
    }
  };

  const estados = [
    "pendiente",
    "en proceso",
    "enviado",
    "entregado",
    "cancelado",
  ];

  return (
    <Container className="detalles-orden-admin">
      {orden && (
        <div>
           {mostrarAdvertencia && (
        <Alert variant="danger">
          No se puede modificar el estado de la orden una vez que esté en estado
          de "entregado" o "cancelado".
        </Alert>
      )}
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
              <p className="fecha-actualizacion">
                Fecha de Entrega:{" "}
                {orden.fechaEntrega ? new Date(orden.fechaEntrega).toLocaleDateString() : '-'}
              </p>
            </Col>
            <Col md={4}>
              {" "}
              <DropdownButton
                variant="info"
                title={nuevoEstado || orden.estado_orden}
                id="estadoDropdown"
                disabled={
                  orden.estado_orden === "entregado" ||
                  orden.estado_orden === "cancelado"
                }
              >
                {estados.map((estado, index) => (
                  <Dropdown.Item
                    key={index}
                    active={estado === nuevoEstado}
                    onClick={() => handleEstadoChange(estado)}
                  >
                    {estado}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col mb md={4}>
              <Button
                variant="info"
                onClick={actualizarEstado}
                disabled={!nuevoEstado}
              >
                Actualizar Estado
              </Button>
            </Col>
          </Row>

    
        </div>
      )}

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
          {direccionEnvio && (
            <div>
              <h1 className="detalles-orden-titulo">Detalles del envío:</h1>
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
