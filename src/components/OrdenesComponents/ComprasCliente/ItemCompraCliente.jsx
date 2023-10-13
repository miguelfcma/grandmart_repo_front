import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "./ItemCompraCliente.css";
import { Card, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";

export function ItemCompraCliente({ orden }) {
  const { id, total, estado_orden, id_usuario, createdAt, updatedAt } = orden;
  const navigate = useNavigate();

  const verDetalles = () => {
    console.log("Ver más detalles del pedido: ", orden);
    navigate(`/dashClient/compras/detalles/${id}`);
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
    <Card className="card-orden">
      <Card.Header className="card-header-orden">
        <Card.Title className="titulo-orden">
          Orden de compra número: {id}
        </Card.Title>
      </Card.Header>
      <Card.Body className="card-body-orden">
        <Card.Title className="titulo-estado">Estado:</Card.Title>
        <Card.Text className={`estado-${estado_orden.toLowerCase()}`}>
          {estado_orden}
        </Card.Text>
        <Card.Text className="fecha-pedido">
          Fecha de pedido:{new Date(createdAt).toLocaleDateString()}
        </Card.Text>
        <Card.Text className="total-orden">$ {total} MXN</Card.Text>
        <Card.Text className="botones-orden">
          <button className="btn-ver-detalles" onClick={verDetalles}>
            Ver detalles de la compra <FaEye className="icono-ojo" />
          </button>{" "}
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
