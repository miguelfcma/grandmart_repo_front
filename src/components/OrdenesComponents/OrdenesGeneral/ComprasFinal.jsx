import React from "react";
import { Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";  // Importa el icono de WhatsApp
import "./ComprasFinal.css";  // Importa estilos CSS
import { useNavigate } from "react-router-dom";  // Importa la función de navegación

// La función ComprasFinal toma el parámetro id_orden
export function ComprasFinal({ id_orden }) {
  // Genera un mensaje de WhatsApp con el ID de orden proporcionado
  const text = `¡Hola! Estoy interesado en obtener más información sobre el proceso de mi paquetería. Mi ID de orden de compra es ${id_orden}.`;

  // Función para generar un enlace de WhatsApp
  function generateWhatsAppLink(phoneNumber, text) {
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedText = encodeURIComponent(text);
    const whatsappLink = `https://api.whatsapp.com/send/?phone=${encodedPhoneNumber}&text=${encodedText}`;
    return whatsappLink;
  }

  // Reemplaza esto con el número de teléfono de la persona encargada de la paquetería
  const phoneNumber = "527353424868"; 

  // Genera el enlace de WhatsApp con el mensaje predefinido
  const whatsappLink = generateWhatsAppLink(phoneNumber, text);

  // Permite la navegación en la aplicación
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="primary"
        href={whatsappLink}  // El botón redirige al enlace de WhatsApp
        target="_blank"
        style={{
          backgroundColor: "#25d366",
          borderColor: "#25d366",
          color: "#ffffff",
          transition: "background-color 0.3s, border-color 0.3s",
        }}
        className="whatsapp-button"
        onMouseEnter={(e) => {
          // Cambia el color del botón al pasar el mouse sobre él
          e.target.style.backgroundColor = "#128c7e";
          e.target.style.borderColor = "#128c7e";
        }}
        onMouseLeave={(e) => {
          // Restablece el color del botón cuando el mouse sale
          e.target.style.backgroundColor = "#25d366";
          e.target.style.borderColor = "#25d366";
        }}
      >
        <FaWhatsapp style={{ marginRight: "5px" }} />  {/* Icono de WhatsApp */}
        Iniciar chat en WhatsApp
      </Button>
    </div>
  );
}
