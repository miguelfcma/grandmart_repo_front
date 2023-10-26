//Este archivo permite mostrar el formulario para crear una reseña
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";

// Definición del componente "FormularioDeResenaAdmin"
export function FormularioDeResenaAdmin({ id_producto, onReviewSubmit }) {
  // Obtiene información del usuario del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estados locales para el título, comentario, calificación y mensaje de error
  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [mensajeDeError, setMensajeDeError] = useState("");

  // Utiliza el contexto "useProductos" para obtener la función "createReview"
  const { createReview } = useProductos();

  // Funciones para manejar cambios en los campos del formulario
  const manejarCambioDeTitulo = (event) => {
    setTitulo(event.target.value);
  };

  const manejarCambioDeComentario = (event) => {
    setComentario(event.target.value);
  };

  const manejarCambioDeCalificacion = (event) => {
    setCalificacion(event.target.value);
  };

  // Función para manejar el envío del formulario
  const manejarEnvioDelFormulario = async (event) => {
    event.preventDefault();

    // Validación de campos requeridos
    if (titulo === "" || comentario === "" || calificacion === 0) {
      setMensajeDeError("Todos los campos son requeridos");
      return;
    }

    // Creación de un objeto "resena" con la información del formulario
    const resena = {
      id_producto,
      id_usuario: usuario.id,
      titulo,
      comentario,
      calificacion,
    };

    // Llama a la función "createReview" del contexto para enviar la reseña al servidor
    await createReview(resena);

    // Limpia los campos del formulario y el mensaje de error
    setTitulo("");
    setComentario("");
    setCalificacion(0);
    setMensajeDeError("");
    onReviewSubmit(); // Llama a una función proporcionada como prop
  };

  // Estado local para manejar las estrellas de calificación
  const [stars, setStars] = useState(
    [...Array(5)].map(() => ({ selected: false, animated: false }))
  );

  // Función para manejar el clic en una estrella de calificación
  const handleStarClick = (index) => {
    const newStars = stars.map((star, i) => ({
      selected: i <= index,
      animated: i === index,
    }));
    setStars(newStars);
    setCalificacion(index + 1);
  };

  // Renderiza el formulario
  return (
    <Form onSubmit={manejarEnvioDelFormulario}>
      <h2>Escribe una reseña</h2>
      {mensajeDeError && <p style={{ color: "red" }}>{mensajeDeError}</p>}
      <Form.Group controlId="titulo">
        <Form.Label>Título:</Form.Label>
        <Form.Control
          type="text"
          value={titulo}
          onChange={manejarCambioDeTitulo}
        />
      </Form.Group>
      <Form.Group controlId="comentario">
        <Form.Label>Comentario:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comentario}
          onChange={manejarCambioDeComentario}
        />
      </Form.Group>

      <Form.Group controlId="calificacion">
        <Form.Label>Calificación:</Form.Label>

        <div className="stars">
          {stars.map((star, index) => (
            <box-icon
              key={index}
              name="star"
              type="solid"
              style={{ cursor: "pointer" }}
              color={star.selected ? "#ffc107" : "#6c757d"}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
}
