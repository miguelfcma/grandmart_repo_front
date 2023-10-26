import React from "react";
import { useState, useEffect } from "react";
import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { Container, ListGroup } from "react-bootstrap";
import "./ListaPreguntasProductoGeneral.css"; // Importa el archivo CSS con los estilos

// Componente que muestra una lista de preguntas relacionadas con un servicio específico.
export function ListaPreguntasServicioGeneral({
  id_servicio,
  actualizarFalse,
  actualizarPreguntas,
}) {
  const { getPreguntasByIdServicio } = useServicios();
  const [preguntas, setPreguntas] = useState([]);

  // Este efecto se ejecuta cuando cambian las dependencias id_servicio o actualizarPreguntas.
  useEffect(() => {
    // Función asincrónica para obtener las preguntas del servicio.
    const fetchPreguntas = async () => {
      const preguntasData = await getPreguntasByIdServicio(id_servicio);

      // Actualiza el estado de las preguntas con los datos obtenidos o un arreglo vacío si no hay preguntas.
      setPreguntas(preguntasData || []);
    };

    // Comprueba si hay preguntas existentes y si se debe actualizar.
    if (preguntas && preguntas.length > 0) {
      if (actualizarPreguntas) {
        // Llama a la función para obtener las preguntas y luego marca que no se deben actualizar.
        fetchPreguntas();
        actualizarFalse();
      }
    } else {
      // Si no hay preguntas existentes, obtiene las preguntas y no necesita comprobar la actualización.
      fetchPreguntas();
    }
  }, [id_servicio, actualizarPreguntas]);

  return (
    <Container>
      <h2 className="titulo">Preguntas</h2>
      {preguntas && preguntas.length > 0 ? (
        <ListGroup className="lista-preguntas">
          {preguntas.map((pregunta) => (
            <ListGroup.Item key={pregunta.id} className="pregunta-item">
              <p className="pregunta">{pregunta.pregunta}</p>
              <div className="fecha">
                Pregunta realizada el:&nbsp;&nbsp;
                {new Date(pregunta.updatedAt).toLocaleDateString()}
                &nbsp;&nbsp;Por: {pregunta.usuario.nombre}
              </div>
              <br></br>
              <p className="respuesta">
                Respuesta: {pregunta.respuesta || "Sin respuesta"}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="no-preguntas">No hay preguntas para mostrar.</p>
      )}
    </Container>
  );
}
