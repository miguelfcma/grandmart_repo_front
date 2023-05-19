import React, { useEffect } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConPreguntaAdmin } from "./ItemProductoConPreguntaAdmin";

export function ListaProductoConPreguntasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { getProductosConPreguntasByUsuarioId, productosPreguntas, eliminarPreguntaProducto } = useProductos();

  const onDeletePregunta = async (preguntaId) => {
    // Lógica que se ejecuta en el componente padre
    try{
      await eliminarPreguntaProducto(preguntaId);
      console.log("Ejecutando la función en el componente padre");
    } catch(error){
      console.log(error);
    }
  };

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
  }, [onDeletePregunta]);

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
          <ItemProductoConPreguntaAdmin key={producto.id} 
          producto={producto}
          onDeletePregunta={onDeletePregunta}
          />
        ))
      ) : (
        <h2>No hay preguntas por responder.</h2>
      )}
    </div>
  );
}
