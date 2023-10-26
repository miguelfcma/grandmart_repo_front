import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";

// Definición del componente "FormularioDeResenaCliente"
export function FormularioDeResenaCliente({ id_producto, onReviewSubmit }) {
  // Obtiene información del usuario actual del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estados locales para el título, comentario, calificación y estrellas seleccionadas
  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [starsSelected, setStarsSelected] = useState(false);

  // Obtiene la función para crear una reseña del contexto de productos
  const { createReview } = useProductos();

  // Funciones para manejar el cambio en el título, comentario y calificación
  const manejarCambioDeTitulo = (event) => {
    setTitulo(event.target.value);
  };

  const manejarCambioDeComentario = (event) => {
    setComentario(event.target.value);
  };

  const manejarCambioDeCalificacion = (event) => {
    setCalificacion(event.target.value);
  };

  // Función para manejar el envío del formulario de reseña
  const manejarEnvioDelFormulario = async (event) => {
    event.preventDefault();

    const resena = {
      id_producto,
      id_usuario: usuario.id,
      titulo,
      comentario,
      calificacion,
    };

    // Llama a la función para crear una reseña con los datos proporcionados
    await createReview(resena);

    // Limpia los campos del formulario y reinicia las estrellas seleccionadas
    setTitulo("");
    setComentario("");
    setCalificacion(0);
    setStarsSelected(false);

    // Llama a la función proporcionada en las props cuando se envía la reseña
    onReviewSubmit();
  };

  // Estados locales para representar estrellas de calificación
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
    setStarsSelected(true);
  };

  // Renderiza el componente del formulario de reseña
  return (
    <Form onSubmit={manejarEnvioDelFormulario}>
      <h2>Escribe una reseña</h2>

      <Form.Group controlId="titulo">
        <Form.Label>Título:</Form.Label>
        <Form.Control
          type="text"
          value={titulo}
          onChange={manejarCambioDeTitulo}
          required
        />
      </Form.Group>
      <Form.Group controlId="comentario">
        <Form.Label>Comentario:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comentario}
          required
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

      <Button variant="primary" type="submit" disabled={!starsSelected}>
        Enviar
      </Button>
    </Form>
  );
}
