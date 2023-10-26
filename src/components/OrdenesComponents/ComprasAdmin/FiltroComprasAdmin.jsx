import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// Definición del componente "FiltroComprasAdmin"
export function FiltroComprasAdmin({ 
  filtroUsuario, 
  setFiltroUsuario, 
  filtroEstadoOrden, 
  setFiltroEstadoOrden, 
  filtroFechaInicio, 
  setFiltroFechaInicio, 
  filtroFechaFin, 
  setFiltroFechaFin, 
  filtroOrden, 
  setFiltroOrden 
}) {
  return (
    <Container>
      <Row>
        <Col>
          {/* Filtro por ID de Orden */}
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
          {/* Filtro por ID de Usuario */}
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
          {/* Filtro por Estado de Orden */}
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
          {/* Filtro por Fecha de Inicio */}
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
          {/* Filtro por Fecha de Fin */}
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
