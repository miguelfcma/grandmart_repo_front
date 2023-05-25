import React from "react";
import { useState, useEffect } from "react";
import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./ListaPreguntasProductoGeneral.css"; // Importa el archivo CSS con los estilos

export function ListaPreguntasServicioGeneral({
  id_servicio,
  actualizarFalse,
  actualizarPreguntas
}) {

  const { getPreguntasByIdServicio } = useServicios();
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      const preguntasData = await getPreguntasByIdServicio(id_servicio);
      console.log("Este es el arreglo de preguntas de servicio:",preguntasData);
      setPreguntas(preguntasData || []);
    };

    if (preguntas && preguntas.length > 0) {
      if(actualizarPreguntas){
        fetchPreguntas();

        actualizarFalse()
      }
    } else {
      fetchPreguntas();
    }
  }, [id_servicio,actualizarPreguntas]);

  

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
              </p>{" "}
              {/* Mensaje "Sin respuesta" en caso de respuesta vacía */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="no-preguntas">No hay preguntas para mostrar.</p>
      )}
    </Container>
  );
}
