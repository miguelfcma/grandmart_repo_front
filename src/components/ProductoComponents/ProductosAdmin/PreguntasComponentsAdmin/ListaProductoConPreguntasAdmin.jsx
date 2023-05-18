import React, { useEffect } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConPreguntaAdmin } from "./ItemProductoConPreguntaAdmin";

export function ListaProductoConPreguntasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { getProductosConPreguntasByUsuarioId, productosPreguntas } = useProductos();

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        // Llamar a la función getProductosConPreguntasByUsuarioId para obtener los productos con preguntas
        await getProductosConPreguntasByUsuarioId(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const preguntasSinResponder = Object.values(productosPreguntas).reduce(
    (preguntas, producto) => {
      const todasRespondidas = producto.preguntas.every(
        pregunta => pregunta.respuesta !== null
      );
      if (!todasRespondidas) {
        preguntas.push(producto);
      }
      return preguntas;
    },
    []
  );
  
  return (
    <div>
      {preguntasSinResponder.length > 0 ? (
        preguntasSinResponder.map(producto => (
          <ItemProductoConPreguntaAdmin key={producto.id} producto={producto}/>
        ))
      ) : (
        <h2>No hay preguntas por responder.</h2>
      )}
    </div>
  );
}
