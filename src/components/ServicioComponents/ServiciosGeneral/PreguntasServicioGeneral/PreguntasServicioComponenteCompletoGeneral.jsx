import React, { useState } from "react";
import { FormNuevaPreguntaServicioGeneral } from "./PreguntasServicioComponentesGeneral/FormNuevaPreguntaServicioGeneral";
import { ListaPreguntasServicioGeneral } from "./PreguntasServicioComponentesGeneral/ListaPreguntasServicioGeneral";
import { Card, Button } from "react-bootstrap";
import "./PreguntasProductoComponenteCompletoGeneral.css";

// Componente principal que muestra preguntas de servicio para un servicio específico.
export function PreguntasServicioComponenteCompletoGeneral({ id_servicio }) {
  // Estado para controlar la actualización de las preguntas.
  const [actualizarPreguntas, setActualizarPreguntas] = useState(false);

  // Estado para controlar la visibilidad del formulario de nueva pregunta.
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Obtiene la información del usuario desde el almacenamiento local.
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Comprueba si un usuario está autenticado.
  const usuarioExiste = usuario && usuario.id;

  // Función para establecer actualizarPreguntas en true.
  const actualizarTrue = () => {
    setActualizarPreguntas(true);
  };

  // Función para establecer actualizarPreguntas en false.
  const actualizarFalse = () => {
    setActualizarPreguntas(false);
  };

  // Función para alternar la visibilidad del formulario de nueva pregunta.
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <h2 className="titulo-preguntas">Preguntas y respuestas</h2>
        </Card.Header>
        {usuarioExiste ? (
          <>
            <Card.Body>
              {mostrarFormulario ? (
                <div>
                  {mostrarFormulario && (
                    <Card.Footer>
                      <Button onClick={toggleFormulario}>
                        Cerrar formulario
                      </Button>
                    </Card.Footer>
                  )}{" "}
                  <FormNuevaPreguntaServicioGeneral
                    id_servicio={id_servicio}
                    actualizarPreguntas={actualizarTrue}
                  />
                </div>
              ) : (
                <Button onClick={toggleFormulario}>
                  Realizar nueva regunta
                </Button>
              )}
            </Card.Body>
          </>
        ) : (
          <p>Debe iniciar sesión realizar una pregunta</p>
        )}
        <Card.Body>
          {" "}
          <ListaPreguntasServicioGeneral
            id_servicio={id_servicio}
            actualizarFalse={actualizarFalse}
            actualizarPreguntas={actualizarPreguntas}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
