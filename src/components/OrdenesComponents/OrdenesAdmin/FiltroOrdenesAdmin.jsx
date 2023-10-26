import React from "react";  // Importa la librería React
import { Container, Row, Col, Form, Button } from "react-bootstrap";  // Importa componentes y estilos de Bootstrap

// Define una función de React llamada FiltroOrdenesAdmin
export function FiltroOrdenesAdmin({
  filtroUsuario,
  setFiltroUsuario,
  filtroEstadoOrden,
  setFiltroEstadoOrden,
  filtroFechaInicio,
  setFiltroFechaInicio,
  filtroFechaFin,
  setFiltroFechaFin,
  filtroOrden,
  setFiltroOrden,
}) {
  // Define las opciones posibles para el estado de la orden
  const opcionesEstadoOrden = [
    "Pendiente",
    "En proceso",
    "Cancelada",
    "Completada",
  ];

  // Función para restablecer todos los filtros a sus valores iniciales
  const handleLimpiarClick = () => {
    setFiltroUsuario("");
    setFiltroEstadoOrden("");
    setFiltroFechaInicio("");
    setFiltroFechaFin("");
    setFiltroOrden("");
    handleLimpiarFiltros();  // Llama a una función handleLimpiarFiltros que falta en el código
  };

  return (
    <Container>
      <Form onReset={handleLimpiarClick}>  {/* Inicia un formulario con la función onReset que llama a handleLimpiarClick */}
        <Row>  {/* Crea una fila en la interfaz */}
          <Col>
            <Form.Group controlId="filtroOrden">
              <Form.Label>Filtrar por ID de Orden</Form.Label>  {/* Etiqueta para el campo de filtro */}
              <Form.Control
                type="number"
                placeholder="ID de Orden"
                value={filtroOrden}  // El valor del campo se controla mediante el estado filtroOrden
                onChange={(e) => setFiltroOrden(parseInt(e.target.value))}  // Actualiza el estado filtroOrden al cambiar el valor del campo
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="filtroUsuario">
              <Form.Label>Filtrar por ID de Usuario</Form.Label>
              <Form.Control
                type="number"
                placeholder="ID de Usuario"
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(parseInt(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="filtroEstadoOrden">
              <Form.Label>Filtrar por Estado de Orden</Form.Label>
              <Form.Control
                as="select"  // Campo de selección (menú desplegable)
                value={filtroEstadoOrden}  // El valor del campo se controla mediante el estado filtroEstadoOrden
                onChange={(e) => setFiltroEstadoOrden(e.target.value)}  // Actualiza el estado filtroEstadoOrden al seleccionar una opción
              >
                <option value="">Seleccione un estado</option>
                {/* Mapea las opciones de estado definidas en opcionesEstadoOrden */}
                {opcionesEstadoOrden.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="filtroFechaInicio">
              <Form.Label>Filtrar por Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de Inicio"
                value={filtroFechaInicio}
                onChange={(e) => setFiltroFechaInicio(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="filtroFechaFin">
              <Form.Label>Filtrar por Fecha de Fin</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de Fin"
                value={filtroFechaFin}
                onChange={(e) => setFiltroFechaFin(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Button variant="secondary" type="reset">  {/* Botón para restablecer filtros */}
              Limpiar filtros
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
