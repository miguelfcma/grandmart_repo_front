import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export function ItemVentaAdmin({ venta }) {

  return (
    <Card>
      <Card.Header>{venta.orden.estado_orden}</Card.Header>
      <Card.Body>
        <Card.Title>Venta #{venta.orden.id}</Card.Title>
        <Card.Text>
          <strong>Fecha de venta:</strong> {venta.orden.createdAt} 
        </Card.Text>
        <Card.Text>
          <strong>Total:</strong> $ {venta.totalVenta} MXN
        </Card.Text>
        <Card.Text>
          <strong>Detalles de la orden:</strong>
        </Card.Text>
        <ListGroup>
          {venta.productos.map((producto, index) => (
            <ListGroup.Item key={index}>
              {producto.producto.nombre} (Cantidad: {producto.cantidad}) - Subtotal: {producto.subtotal} 
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
