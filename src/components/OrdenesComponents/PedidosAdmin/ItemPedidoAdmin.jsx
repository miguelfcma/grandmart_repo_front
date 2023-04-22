import React from "react";
import { Card } from "react-bootstrap";

export function ItemPedidoAdmin({ pedido }) {
  // Accede a las propiedades del pedido para mostrar la información necesaria
  const { id, cantidad, precio_unitario, producto, id_orden, id_producto } = pedido;
  const { nombre, precio } = producto;

  return (
    <Card>
      <Card.Body>
        <Card.Title>ID del pedido: {id}</Card.Title>
        <Card.Text>ID del producto: {id_producto}</Card.Text>
        <Card.Text>Producto: {nombre}</Card.Text>
        <Card.Text>Cantidad: {cantidad}</Card.Text>
        <Card.Text>ID de la orden: {id_orden}</Card.Text>
        <Card.Text>Precio unitario: ${precio_unitario}</Card.Text>
        <Card.Text>Total: ${precio_unitario * cantidad}</Card.Text>
      </Card.Body>
    </Card>
  );
}
