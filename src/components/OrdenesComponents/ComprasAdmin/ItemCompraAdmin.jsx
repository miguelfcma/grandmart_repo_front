import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar useNavigate y Link para la navegación
import { FaEye } from "react-icons/fa"; // Importar el icono de ojo
import "./ItemCompraAdmin.css";
import { Card } from "react-bootstrap";
export function ItemCompraAdmin({ orden }) {
  const {
    id,
    total,
    estado_orden,
    id_usuario,
    createdAt,
    updatedAt,
    fechaEntrega,
  } = orden;
  const navigate = useNavigate(); // Obtener la función navigate para la navegación

  const verDetalles = () => {
    // Función de manejo de evento para ver detalles del pedido
    console.log("Ver más detalles del pedido: ", orden);
    // Navegar a la página de detalles del pedido, puedes modificar la URL según tu estructura de rutas
    navigate(`/dashClient/compras/detalles/${id}`);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Carrito de compra</Card.Title>
        <Card.Subtitle>Mis carritos de compra</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Title>ID orden:</Card.Title> <Card.Text>{id}</Card.Text>
        <Card.Title>Estado de la orden:</Card.Title>
        <Card.Text className={`estado-${estado_orden.toLowerCase()}`}>
          {estado_orden}
        </Card.Text>
        <Card.Text>Fecha de pedido:{new Date(createdAt).toLocaleDateString()}</Card.Text>
        <Card.Text>
          {fechaEntrega ? new Date(fechaEntrega).toLocaleDateString() : ""}
        </Card.Text>

        {/* <td>{new Date(updatedAt).toLocaleDateString()}</td> */}
        <Card.Text>{total}</Card.Text>
        <Card.Text>
          {/* Agregar el botón con el icono de ojo y la función de manejo de eventos */}
          <button className="btn-ver-detalles" onClick={verDetalles}>Ver detalles de la compra{" "}
            <FaEye className="icono-ojo" />
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
