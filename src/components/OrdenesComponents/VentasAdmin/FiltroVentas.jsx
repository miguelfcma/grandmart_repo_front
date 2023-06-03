import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function FiltroVentas({ handleFiltrarVentas, handleLimpiarFiltros }) {
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTotalMin, setFiltroTotalMin] = useState("");
  const [filtroTotalMax, setFiltroTotalMax] = useState("");
  const [filtroID, setFiltroID] = useState("");

  const handleEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };

  const handleTotalMinChange = (e) => {
    setFiltroTotalMin(e.target.value);
  };

  const handleTotalMaxChange = (e) => {
    setFiltroTotalMax(e.target.value);
  };

  const handleIDChange = (e) => {
    setFiltroID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtros = {
      estado: filtroEstado,
      totalMin: filtroTotalMin,
      totalMax: filtroTotalMax,
      id: filtroID,
    };
    handleFiltrarVentas(filtros);
  };

  const handleLimpiarClick = () => {
    setFiltroEstado("");
    setFiltroTotalMin("");
    setFiltroTotalMax("");
    setFiltroID("");
    handleLimpiarFiltros();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} onReset={handleLimpiarClick}>
        <Row>
          <Col>
            <Form.Group controlId="estado">
              <Form.Label>Estado:</Form.Label>
              <Form.Control
                as="select"
                value={filtroEstado}
                onChange={handleEstadoChange}
              >
                <option value="">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">En proceso</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Completada">Completada</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="totalMin">
              <Form.Label>Total Mínimo $:</Form.Label>
              <Form.Control
                type="number"
                value={filtroTotalMin}
                onChange={handleTotalMinChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="totalMax">
              <Form.Label>Total Máximo $:</Form.Label>
              <Form.Control
                type="number"
                value={filtroTotalMax}
                onChange={handleTotalMaxChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="id">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                value={filtroID}
                onChange={handleIDChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Filtrar
            </Button>{" "}
          </Col>
          <Col>
            <Button variant="secondary" type="reset">
              Limpiar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
