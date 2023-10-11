import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { Link } from "react-router-dom";
import "./ItemProductoPreguntaCliente.css";

export function ItemProductoConPreguntaCliente({ producto, onDeletePregunta }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { crearRespuestaProducto } = useProductos();
  const [respuestas, setRespuestas] = useState([]);
  const [preguntasVisible, setPreguntasVisible] = useState(false);

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

  const handleSubmitRespuesta = async (id_pregunta, respuesta) => {
    try {
      await crearRespuestaProducto(usuario.id, id_pregunta, { respuesta });
      setRespuestas((prevRespuestas) => {
        return prevRespuestas.filter((r) => r.preguntaId !== id_pregunta);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminarPregunta = (preguntaId) => {
    try {
      onDeletePregunta(preguntaId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTogglePreguntasVisible = () => {
    setPreguntasVisible(!preguntasVisible);
  };

  const preguntasSinRespuesta = producto.preguntas.filter(
    (pregunta) => pregunta.respuesta === null
  );

  const preguntasRespondidas = producto.preguntas.filter(
    (pregunta) => pregunta.respuesta !== null
  )

  return (
    <div>
      <React.Fragment>
        {preguntasSinRespuesta.length > 0 ? (
          <Card key={producto.id}>
            <Card.Header>
            <Link
              to={`/dashClient/productos/detalles/${producto.producto.id}`}
              style={{ textDecoration: "none" }}
            >
              <h2>
                ID: {producto.producto.id} - {producto.producto.nombre}
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
                &nbsp; ({preguntasSinRespuesta.length})
              </Button>
              <Collapse in={preguntasVisible}>
                <ListGroup variant="flush" id="preguntas-collapse">
                  {preguntasSinRespuesta.map((pregunta) => (
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

                      {/* Eliminar siempre visible */}
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
          <Card key={producto.id}>
            <Card.Header>
            <Link
              to={`/dashClient/productos/detalles/${producto.producto.id}`}
              style={{ textDecoration: "none" }}
            >
              <h2>
                ID: {producto.producto.id} - {producto.producto.nombre}
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
                &nbsp; ({preguntasRespondidas.length})
              </Button>
              <Collapse in={preguntasVisible}>
                <ListGroup variant="flush" id="preguntas-collapse">
                  {preguntasRespondidas.map((pregunta) => (
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

                      {/* Eliminar siempre visible 
                      <div className="contBotones">
                        <Button
                          variant="danger"
                          className="btnEliminar"
                          onClick={() => handleEliminarPregunta(pregunta.id)}
                          style={{ marginLeft: "1rem" }}
                        >
                          Eliminar pregunta
                        </Button>
                      </div>*/}
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
