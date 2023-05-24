import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import "./InfoContacto.css";

export function InfoContacto() {
  const phoneNumber = "+527353424868";
  const text = `¡Hola! Estoy interesado en obtener más información sobre GrandMart marketplace.`;

  function generateWhatsAppLink(phoneNumber, text) {
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedText = encodeURIComponent(text);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${encodedPhoneNumber}&text=${encodedText}`;
    return whatsappLink;
  }

  const whatsappLink = generateWhatsAppLink(phoneNumber, text);

  return (
    <Container>
      <h2 className="info-heading">Información de contacto</h2>
      <Row>
        <Col>
          <p className="contact-info">GrandMart</p>
          <p className="contact-info">
            Paseo de las Acacias No°2 Col. Ampliación Bugambilias Jiutepec,
            Morelos, México C.P. 6575
          </p>
          <p className="contact-info">Email: sales@hi-techdesign.com</p>
          <p className="contact-info">Email: info@hi-techdesign.com</p>
        </Col>
        <Col>
          <p className="contact-info">Teléfonos:</p>
          <p className="contact-info">+52(777) 100 5016</p>
          <p className="contact-info">+52(777) 245 6196</p>
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
            Iniciar chat en WhatsApp
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
