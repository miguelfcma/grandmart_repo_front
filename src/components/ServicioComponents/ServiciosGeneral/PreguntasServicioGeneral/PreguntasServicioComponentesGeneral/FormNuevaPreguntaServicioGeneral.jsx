import { crearPreguntaServicioRequest } from "../../../../../API/ServiciosApiRest/preguntasServicio.api";
import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./FormNuevaPreguntaProductoGeneral.css";
import Swal from 'sweetalert2';
export function FormNuevaPreguntaServicioGeneral({
  id_servicio,
  actualizarPreguntas,
}) {
  const { crearPreguntaServicio } = useServicios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [error, setError] = useState(null);
  const [pregunta, setPregunta] = useState({
    pregunta: "",
    id_servicio: id_servicio,
    id_usuario: usuario.id,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pregunta.pregunta.trim() === "") {
      setError("La pregunta no puede estar vacía.");
      return;
    }
    try {
      console.log(pregunta);
      const res = await crearPreguntaServicio(pregunta);
      setPregunta({
        pregunta: "",
        id_servicio: id_servicio,
        id_usuario: usuario.id,
      });
      actualizarPreguntas();

      Swal.fire({
        title: "Éxito",
        text: "La pregunta fue creada exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al crear la pregunta.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
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
           {error && <p className="error">{error}</p>}
        </Form.Group>

        <Button type="submit" className="btn-azul">
          Enviar
        </Button>
      </Form>
    </div>
  );
}
