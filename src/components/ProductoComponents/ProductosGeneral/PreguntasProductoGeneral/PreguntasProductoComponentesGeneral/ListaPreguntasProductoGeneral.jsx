import { useState, useEffect } from "react";
import { useProductos } from "../../../ProductosContext/ProductoProvider";

export function ListaPreguntasProductoGeneral({id_producto, actualizarPreguntas}) {
  const { getPreguntasByIdProducto } = useProductos();
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      const preguntasData = await getPreguntasByIdProducto(id_producto);
      setPreguntas(preguntasData || []);
    };
    fetchPreguntas();
  }, [id_producto, actualizarPreguntas]);

  return (
    <div>
      <h2>Preguntas</h2>
      {preguntas && preguntas.length > 0 ? (
        <ul>
          {preguntas.map((pregunta) => (
            <li key={pregunta.id}>
              <p>{pregunta.pregunta}</p>
              <p>{pregunta.respuesta}</p>
              <div className="fecha">Pregunta realizada el:{new Date(pregunta.updatedAt).toLocaleDateString()} Por: {pregunta.usuario.nombre}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay preguntas para mostrar.</p>
      )}
    </div>
  );
}
