import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";

export function FormularioDeResenaAdmin({ id_producto, onReviewSubmit }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [mensajeDeError, setMensajeDeError] = useState("");

  const { createReview } = useProductos();

  const manejarCambioDeTitulo = (event) => {
    setTitulo(event.target.value);
  };

  const manejarCambioDeComentario = (event) => {
    setComentario(event.target.value);
  };

  const manejarCambioDeCalificacion = (event) => {
    setCalificacion(event.target.value);
  };

  const manejarEnvioDelFormulario = async (event) => {
    event.preventDefault();

    // Aquí podrías agregar tu lógica para enviar la reseña al servidor
    // usando el `fetch` API o alguna otra biblioteca de solicitud HTTP

    if (titulo === "" || comentario === "" || calificacion === 0) {
      setMensajeDeError("Todos los campos son requeridos");
      return;
    }

    const resena = {
      id_producto,
      id_usuario: usuario.id,
      titulo,
      comentario,
      calificacion,
    };

    console.log("Reseña:", resena);
    await createReview(resena);
    setTitulo("");
    setComentario("");
    setCalificacion(0);
    setMensajeDeError("");
    setStars([...Array(5)].map(() => ({ selected: false, animated: false })));
    onReviewSubmit();
  };

  const [stars, setStars] = useState(
    [...Array(5)].map(() => ({ selected: false, animated: false }))
  );

  const handleStarClick = (index) => {
    const newStars = stars.map((star, i) => ({
      selected: i <= index,
      animated: i === index,
    }));
    setStars(newStars);
    setCalificacion(index + 1);
  };

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
