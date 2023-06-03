import React from "react";
import { Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import "./ComprasFinal.css";
import { useNavigate } from "react-router-dom";
export function ComprasFinal({ id_orden }) {
  const text = `¡Hola! Estoy interesado en obtener más información sobre el proceso de mi paquetería. Mi ID de orden de compra es ${id_orden}.`;

  function generateWhatsAppLink(phoneNumber, text) {
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedText = encodeURIComponent(text);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${encodedPhoneNumber}&text=${encodedText}`;
    return whatsappLink;
  }

  const phoneNumber = "527353424868"; // Reemplaza esto con el número de teléfono de la persona encargada de la paquetería
  const whatsappLink = generateWhatsAppLink(phoneNumber, text);
  const navigate = useNavigate();
  return (
    <div>
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
    </div>
  );
}
