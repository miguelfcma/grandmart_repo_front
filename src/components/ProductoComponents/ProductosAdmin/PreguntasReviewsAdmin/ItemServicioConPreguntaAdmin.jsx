import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";
import { Link } from "react-router-dom";

// Componente que muestra preguntas en el panel de administración de servicios
export function ItemServicioConPreguntaAdmin({
  servicio,
  onDeletePreguntaServicio,
}) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { crearRespuestaServicio } = useServicios();
  const [respuestas, setRespuestas] = useState([]);
  const [preguntasVisible, setPreguntasVisible] = useState(false);

  // Maneja cambios en las respuestas de las preguntas
  const handleRespuestaChange = (preguntaId, respuesta) => {
    setRespuestas((prevRespuestas) => {
      const respuestasActualizadas = [...prevRespuestas];
      const preguntaIndex = respuestasActualizadas.findIndex(
        (r) => r.preguntaId === preguntaId
      );
      if (preguntaIndex !== -1) {
        respuestasActualizadas[preguntaIndex].respuesta = respuesta;
      } else {
        respuestasActualizadas.push({ preguntaId, respuesta });
      }
      return respuestasActualizadas;
    });
  };

  // Maneja el envío de una respuesta a una pregunta
  const handleSubmitRespuesta = async (id_pregunta, respuesta) => {
    try {
      await crearRespuestaServicio(usuario.id, id_pregunta, { respuesta });
      setRespuestas((prevRespuestas) => {
        return prevRespuestas.filter((r) => r.preguntaId !== id_pregunta);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Elimina una pregunta de servicio
  const handleEliminarPregunta = (preguntaId) => {
    try {
      onDeletePreguntaServicio(preguntaId);
    } catch (error) {
      console.error(error);
    }
  };

  // Maneja el cambio de visibilidad de las preguntas
  const handleTogglePreguntasVisible = () => {
    setPreguntasVisible(!preguntasVisible);
  };

  // Filtra las preguntas sin respuesta
  const preguntasSinRespuestaServicios = servicio.preguntas.filter(
    (pregunta) => pregunta.respuesta === null
  );

  // Filtra las preguntas respondidas
  const preguntasRespondidasServicios = servicio.preguntas.filter(
    (pregunta) => pregunta.respuesta !== null
  );

  return (
    <div>
      <React.Fragment>
        {preguntasSinRespuestaServicios.length > 0 ? (
          <Card key={servicio.id}>
            <Card.Header>
              <Link
                to={`/dashAdmin/servicios/detalles/${servicio.servicio.id}`}
                style={{ textDecoration: "none" }}
              >
                <h2>
                  ID: {servicio.servicio.id} - {servicio.servicio.titulo}
                </h2>
              </Link>
            </Card.Header>
            <Card.Body>
              <Button
                variant="primary"
                onClick={handleTogglePreguntasVisible}
                aria-controls="preguntas-collapse"
                aria-expanded={preguntasVisible}
              >
                {preguntasVisible ? "Ocultar preguntas" : "Mostrar preguntas"}
                &nbsp; ({preguntasSinRespuestaServicios.length})
              </Button>
              <Collapse in={preguntasVisible}>
                <ListGroup variant="flush" id="preguntas-collapse">
                  {preguntasSinRespuestaServicios.map((pregunta) => (
                    <ListGroup.Item key={pregunta.id}>
                      <div
                        style={{
                          display: "inline-block",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        Pregunta:{" "}
                      </div>
                      {pregunta.pregunta}
                      <Form.Group controlId={`respuesta-${pregunta.id}`}>
                        <div className="respuesta-container">
                          <span className="respuesta-label">Respuesta:</span>
                          <Form.Control
                            type="text"
                            placeholder="Escribir una respuesta..."
                            value={
                              respuestas.find(
                                (r) => r.preguntaId === pregunta.id
                              )?.respuesta || ""
                            }
                            onChange={(e) =>
                              handleRespuestaChange(pregunta.id, e.target.value)
                            }
                            className="respuesta-input"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // Evita que haya un salto de línea en el input
                                handleSubmitRespuesta(
                                  pregunta.id,
                                  respuestas.find(
                                    (r) => r.preguntaId === pregunta.id
                                  )?.respuesta
                                );
                              }
                            }}
                          />
                          {respuestas.find((r) => r.preguntaId === pregunta.id)
                            ?.respuesta ? (
                            <Button
                              className="btnEnviarRespuesta"
                              onClick={() =>
                                handleSubmitRespuesta(
                                  pregunta.id,
                                  respuestas.find(
                                    (r) => r.preguntaId === pregunta.id
                                  )?.respuesta
                                )
                              }
                              style={{ marginLeft: "1rem" }}
                            >
                              Enviar
                            </Button>
                          ) : (
                            <Button
                              className="btnEnviarRespuesta"
                              onClick={() =>
                                handleSubmitRespuesta(
                                  pregunta.id,
                                  respuestas.find(
                                    (r) => r.preguntaId === pregunta.id
                                  )?.respuesta
                                )
                              }
                              style={{ marginLeft: "1rem" }}
                              disabled
                            >
                              Enviar
                            </Button>
                          )}
                        </div>
                      </Form.Group>

                   
                      <div className="contBotones">
                        <Button
                          variant="danger"
                          className="btnEliminar"
                          onClick={() => handleEliminarPregunta(pregunta.id)}
                          style={{ marginLeft: "1rem" }}
                        >
                          Eliminar pregunta
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Collapse>
            </Card.Body>
          </Card>
        ) : (
          <Card key={servicio.id}>
            <Card.Header>
              <Link
                to={`/dashAdmin/servicios/detalles/${servicio.servicio.id}`}
                style={{ textDecoration: "none" }}
              >
                <h2>
                  ID: {servicio.servicio.id} - {servicio.servicio.titulo}
                </h2>
              </Link>
            </Card.Header>
            <Card.Body>
              <Button
                variant="primary"
                onClick={handleTogglePreguntasVisible}
                aria-controls="preguntas-collapse"
                aria-expanded={preguntasVisible}
              >
                {preguntasVisible ? "Ocultar preguntas" : "Mostrar preguntas"}
                &nbsp; ({preguntasRespondidasServicios.length})
              </Button>
              <Collapse in={preguntasVisible}>
                <ListGroup variant="flush" id="preguntas-collapse">
                  {preguntasRespondidasServicios.map((pregunta) => (
                    <ListGroup.Item key={pregunta.id}>
                      <div
                        style={{
                          display: "inline-block",
                          fontWeight: "bold",
                          marginRight: "10px",
                        }}
                      >
                        Pregunta:{" "}
                      </div>
                      {pregunta.pregunta}
                      <Form.Group controlId={`respuesta-${pregunta.id}`}>
                        <div className="respuesta-container">
                          <span className="respuesta-label">Respuesta: </span>
                          {pregunta.respuesta}
                        </div>
                      </Form.Group>

                 
                      <div className="contBotones">
                        <Button
                          variant="danger"
                          className="btnEliminar"
                          onClick={() => handleEliminarPregunta(pregunta.id)}
                          style={{ marginLeft: "1rem" }}
                        >
                          Eliminar pregunta
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Collapse>
            </Card.Body>
          </Card>
        )}
      </React.Fragment>
      <br></br>
    </div>
  );
}
