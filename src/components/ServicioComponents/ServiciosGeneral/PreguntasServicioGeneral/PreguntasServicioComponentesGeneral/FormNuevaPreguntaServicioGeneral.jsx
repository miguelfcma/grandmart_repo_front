import { crearPreguntaServicioRequest } from "../../../../../API/ServiciosApiRest/preguntasServicio.api";
import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./FormNuevaPreguntaProductoGeneral.css"
export function FormNuevaPreguntaServicioGeneral({id_servicio,actualizarPreguntas}) {
  const { crearPreguntaServicio } = useServicios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [pregunta, setPregunta] = useState({
    pregunta: "",
    id_servicio: id_servicio,
    id_usuario: usuario.id,
  });

  console.log("este es el idservicio", id_servicio);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pregunta.pregunta.trim() === "") {
      setError("La pregunta no puede estar vacía.");
      return;
    }
    try {
      console.log(pregunta)
      const res = await crearPreguntaServicio(pregunta);
      setPregunta({
        pregunta: "",
        id_servicio: id_servicio,
        id_usuario: usuario.id,
      });
      actualizarPreguntas()
      alert("La pregunta fue creada exitosamente.");
    } catch (error) {
      alert("Ocurrió un error al crear la pregunta.");
    }
  };

  return (
    <div className="nueva-pregunta-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Pregúntale al vendedor:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escribe aquí tu pregunta..."
            value={pregunta.pregunta}
            onChange={(event) =>
              setPregunta({ ...pregunta, pregunta: event.target.value })
            }
            required
          />
        </Form.Group>

        <Button type="submit" className="btn-azul">
          Enviar
        </Button>
      </Form>
    </div>
  );
}
