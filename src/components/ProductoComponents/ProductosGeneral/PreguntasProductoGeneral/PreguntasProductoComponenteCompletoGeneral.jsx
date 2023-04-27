import React, { useState } from "react";
import { FormNuevaPreguntaProductoGeneral } from "./PreguntasProductoComponentesGeneral/FormNuevaPreguntaProductoGeneral";
import { ListaPreguntasProductoGeneral } from "./PreguntasProductoComponentesGeneral/ListaPreguntasProductoGeneral";
import "./PreguntasProductoComponenteCompletoGeneral.css";

export function PreguntasProductoComponenteCompletoGeneral({ id_producto }) {
  const [actualizarPreguntas, setActualizarPreguntas] = useState(false);

  const actualizar = () => {
    setActualizarPreguntas(!actualizarPreguntas);
  };

  return (
    <div>
      <div className="preguntas-container">
        <h2 className="titulo-preguntas">Preguntas y respuestas</h2>
        <FormNuevaPreguntaProductoGeneral
          id_producto={id_producto}
          actualizarPreguntas={actualizar}
        />
        <ListaPreguntasProductoGeneral
          id_producto={id_producto}
          actualizarPreguntas={actualizar}
        />
      </div>
      <footer>
        <p>Derechos Reservados © 2023 GrandMart</p>
      </footer>
    </div>
  );
}
