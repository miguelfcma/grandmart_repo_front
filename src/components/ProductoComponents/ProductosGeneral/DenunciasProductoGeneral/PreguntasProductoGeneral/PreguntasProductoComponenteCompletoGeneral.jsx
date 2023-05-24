import React, { useState } from "react";
import { FormNuevaPreguntaProductoGeneral } from "./PreguntasProductoComponentesGeneral/FormNuevaPreguntaProductoGeneral";
import { ListaPreguntasProductoGeneral } from "./PreguntasProductoComponentesGeneral/ListaPreguntasProductoGeneral";
import { Card, Button } from "react-bootstrap";
import "./PreguntasProductoComponenteCompletoGeneral.css";

export function PreguntasProductoComponenteCompletoGeneral({ id_producto }) {
  const [actualizarPreguntas, setActualizarPreguntas] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioExiste = usuario && usuario.id;

  const actualizarTrue = () => {
    setActualizarPreguntas(true);

  };
  const actualizarFalse = () => {
    setActualizarPreguntas(false);

  };
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      
        <Card>
          <Card.Header>
            <h2 className="titulo-preguntas">Preguntas y respuestas</h2>
          </Card.Header>
          {usuarioExiste ? (<>
          <Card.Body>
            {mostrarFormulario ? (
              <div>{mostrarFormulario && (
                <Card.Footer>
                  <Button onClick={toggleFormulario}>Cerrar formulario</Button>
                </Card.Footer>
              )} <FormNuevaPreguntaProductoGeneral
              id_producto={id_producto}
              actualizarPreguntas={actualizarTrue}
            /></div>
             
            ) : (
              <Button onClick={toggleFormulario}>Realizar nueva regunta</Button>
            )}
           
          </Card.Body>
          
    
        </>
      ) : (
        <p>Debe iniciar sesión realizar una pregunta</p>
      )}
      <Card.Body> <ListaPreguntasProductoGeneral
              id_producto={id_producto}
              actualizarFalse={actualizarFalse}
              actualizarPreguntas ={actualizarPreguntas}
            /></Card.Body>
                </Card>
    </div>
  );
}
