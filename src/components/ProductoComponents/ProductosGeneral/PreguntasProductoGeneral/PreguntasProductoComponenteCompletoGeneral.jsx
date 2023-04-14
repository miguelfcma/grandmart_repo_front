
import { FomNuevaPreguntaProductoGeneral } from "./PreguntasProductoComponentesGeneral/FomNuevaPreguntaProductoGeneral"
import { ListaPreguntasProductoGeneral } from "./PreguntasProductoComponentesGeneral/ListaPreguntasProductoGeneral"

export  function PreguntasProductoComponenteCompletoGeneral({id_producto}) {
  return (
    <div>
      <FomNuevaPreguntaProductoGeneral id_producto={id_producto}/>
      <ListaPreguntasProductoGeneral id_producto={id_producto}/>
    </div>
  )
}
