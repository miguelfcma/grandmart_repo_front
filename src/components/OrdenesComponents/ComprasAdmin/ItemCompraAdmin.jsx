import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar useNavigate y Link para la navegación
import { FaEye } from "react-icons/fa"; // Importar el icono de ojo
import "./ItemCompraAdmin.css";
import { Card, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
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

    // Navegar a la página de detalles del pedido, puedes modificar la URL según tu estructura de rutas
    navigate(`/dashAdmin/compras/detalles/${id}`);
  };

  const phoneNumber = "+527353424868";
  const text = `¡Hola! Me gustaría obtener más información sobre el estado de mi orden de compra con el ID: ${id}`;

  function generateWhatsAppLink(phoneNumber, text) {
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedText = encodeURIComponent(text);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${encodedPhoneNumber}&text=${encodedText}`;
    return whatsappLink;
  }

  const whatsappLink = generateWhatsAppLink(phoneNumber, text);

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
        <Card.Text>
          Fecha de pedido:{new Date(createdAt).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          {fechaEntrega ? new Date(fechaEntrega).toLocaleDateString() : ""}
        </Card.Text>
        {/* <td>{new Date(updatedAt).toLocaleDateString()}</td> */}
        <Card.Text>{total}</Card.Text>
        <Card.Text>
          {/* Agregar el botón con el icono de ojo y la función de manejo de eventos */}
          <Button className="btn-ver-detalles" onClick={verDetalles}>
            Ver detalles de la compra <FaEye className="icono-ojo" />
          </Button>{" "}
          <Button
            variant="primary"
            href={whatsappLink}
            target="_blank"
            style={{
              backgroundColor: "#25d366",
              borderColor: "#25d366",
              color: "#ffffff",
              transition: "background-color 0.3s, border-color 0.3s",
            }}
            className="whatsapp-button"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#128c7e";
              e.target.style.borderColor = "#128c7e";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#25d366";
              e.target.style.borderColor = "#25d366";
            }}
          >
            <FaWhatsapp style={{ marginRight: "5px" }} />
            Contactar al Repartidor
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
