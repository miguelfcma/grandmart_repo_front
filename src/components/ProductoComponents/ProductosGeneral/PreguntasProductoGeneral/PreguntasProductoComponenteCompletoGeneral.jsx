import React, { useState } from "react";
import { FormNuevaPreguntaProductoGeneral } from "./PreguntasProductoComponentesGeneral/FormNuevaPreguntaProductoGeneral";
import { ListaPreguntasProductoGeneral } from "./PreguntasProductoComponentesGeneral/ListaPreguntasProductoGeneral";
import "./PreguntasProductoComponenteCompletoGeneral.css"

export function PreguntasProductoComponenteCompletoGeneral({ id_producto }) {
  const [actualizarPreguntas, setActualizarPreguntas] = useState(false);

  const actualizar = () => {
    setActualizarPreguntas(!actualizarPreguntas);
  };

  return (
    <div className="preguntas-container">
      <h1 className="titulo-preguntas">Preguntas del producto</h1>
      <FormNuevaPreguntaProductoGeneral
        id_producto={id_producto}
        actualizarPreguntas={actualizar}
      />
      <ListaPreguntasProductoGeneral
        id_producto={id_producto}
        actualizarPreguntas={actualizar}
      />
    </div>
  );
}
