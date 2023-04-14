
import { useState } from "react";
import { FomNuevaPreguntaProductoGeneral } from "./PreguntasProductoComponentesGeneral/FomNuevaPreguntaProductoGeneral"
import { ListaPreguntasProductoGeneral } from "./PreguntasProductoComponentesGeneral/ListaPreguntasProductoGeneral"

export  function PreguntasProductoComponenteCompletoGeneral({id_producto}) {

  const [actualizarPreguntas, setActualizarPreguntas] = useState(false); // inicialmente lo configuramos como falso

  const actualizar = () => {
    setActualizarPreguntas(!actualizarPreguntas); // cambiamos la variable para que se llame a la función de actualizar preguntas
  };

  return (
    <div>
      <FomNuevaPreguntaProductoGeneral id_producto={id_producto} actualizarPreguntas={actualizar} />
      <ListaPreguntasProductoGeneral id_producto={id_producto} actualizarPreguntas={actualizar}/>
    </div>
  )
}
