import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export function FiltroComprasCliente({
  filtroUsuario,            // Propiedad para el filtro por ID de usuario
  setFiltroUsuario,         // Función para actualizar el filtro de ID de usuario
  filtroEstadoOrden,        // Propiedad para el filtro por estado de orden
  setFiltroEstadoOrden,     // Función para actualizar el filtro de estado de orden
  filtroFechaInicio,        // Propiedad para el filtro por fecha de inicio
  setFiltroFechaInicio,     // Función para actualizar el filtro de fecha de inicio
  filtroFechaFin,           // Propiedad para el filtro por fecha de fin
  setFiltroFechaFin         // Función para actualizar el filtro de fecha de fin
}) {
  return (
    <Container>
      <Row>
        <Col>
          <Form.Group controlId="filtroOrden">
            <Form.Label>Filtrar por ID de Orden</Form.Label>
            <Form.Control
              type="number"
              placeholder="ID de Orden"
              value={filtroOrden}
              onChange={(e) => setFiltroOrden(parseInt(e.target.value))}
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
              type="text"
              placeholder="Estado de Orden"
              value={filtroEstadoOrden}
              onChange={(e) => setFiltroEstadoOrden(e.target.value)}
            />
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
      </Row>
    </Container>
  );
}
