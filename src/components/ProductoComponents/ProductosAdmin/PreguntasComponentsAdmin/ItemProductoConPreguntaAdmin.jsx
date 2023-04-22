import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";

export function ItemProductoConPreguntaAdmin({ producto }) {
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

  const handleSubmitRespuesta = (preguntaId, respuesta) => {
    // Aquí puedes manejar la lógica para enviar la respuesta al servidor
    // por ejemplo, mediante una API
    console.log(
      "Respuesta enviada para la preguntaId:",
      preguntaId,
      "Respuesta:",
      respuesta
    );
  };

  const handleEliminarPregunta = (preguntaId) => {
    // Aquí puedes manejar la lógica para eliminar la pregunta
    // por ejemplo, mediante una API
    console.log("Pregunta eliminada con la preguntaId:", preguntaId);
  };

  const handleEditarRespuesta = (preguntaId) => {
    // Aquí puedes manejar la lógica para editar la respuesta
    // por ejemplo, mostrando un modal o una ventana de edición
    console.log("Editar respuesta de la preguntaId:", preguntaId);
  };

  const handleTogglePreguntasVisible = () => {
    setPreguntasVisible(!preguntasVisible);
  };

  return (
    <Card key={producto.id}>
      <Card.Header>
        <h2>{producto.nombre}</h2>
      </Card.Header>
      <Card.Body>
        <Button
          variant="primary"
          onClick={handleTogglePreguntasVisible}
          aria-controls="preguntas-collapse"
          aria-expanded={preguntasVisible}
        >
          {preguntasVisible ? "Ocultar Preguntas" : "Mostrar Preguntas"}
        </Button>
        <Collapse in={preguntasVisible}>
          <ListGroup variant="flush" id="preguntas-collapse">
            {producto.preguntas.map((pregunta) => (
              <ListGroup.Item key={pregunta.id}>
                Pregunta: {pregunta.pregunta}
                <Form.Group controlId={`respuesta-${pregunta.id}`}>
                  <Form.Control
                    type="text"
                    placeholder="Respuesta"
                    value={
                      respuestas.find((r) => r.preguntaId === pregunta.id)
                        ?.respuesta || ""
                    }
                    onChange={(e) =>
                      handleRespuestaChange(pregunta.id, e.target.value)
                    }
                  />
                </Form.Group>
                {/* Eliminar siempre visible */}
                <Button
                  variant="danger"
                  onClick={() => handleEliminarPregunta(pregunta.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Eliminar Pregunta
                </Button>
                {respuestas.find((r) => r.preguntaId === pregunta.id)
                  ?.respuesta !== null ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleEditarRespuesta(pregunta.id)}
                      style={{ marginLeft: "1rem" }}
                    >
                      Editar Respuesta
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleSubmitRespuesta(
                          pregunta.id,
                          respuestas.find((r) => r.preguntaId === pregunta.id)
                            ?.respuesta
                        )
                      }
                      style={{ marginLeft: "1rem" }}
                    >
                      Enviar Respuesta
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleSubmitRespuesta(
                        pregunta.id,
                        respuestas.find((r) => r.preguntaId === pregunta.id)
                          ?.respuesta
                      )
                    }
                    style={{ marginLeft: "1rem" }}
                  >
                    Enviar Respuesta
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
