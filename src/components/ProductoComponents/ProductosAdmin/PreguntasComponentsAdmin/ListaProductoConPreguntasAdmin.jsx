import React, { useEffect, useState } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConPreguntaAdmin } from "./ItemProductoConPreguntaAdmin";

export function ListaProductoConPreguntasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const {
    getProductosConPreguntasByUsuarioId,
    productosPreguntas,
    eliminarPreguntaProducto,
  } = useProductos();

  const onDeletePregunta = async (preguntaId) => {
    // Lógica que se ejecuta en el componente padre
    try {
      await eliminarPreguntaProducto(preguntaId);
      console.log("Ejecutando la función en el componente padre");
    } catch (error) {
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
  }, []);
  console.log("Hola puto")
  console.log(productosPreguntas);
  const preguntasSinResponder = Object.values(productosPreguntas).reduce(
    (preguntas, producto) => {
      const todasRespondidas = producto.preguntas.every(
        (pregunta) => pregunta.respuesta !== null
      );
      if (!todasRespondidas) {
        preguntas.push(producto);
      }
      return preguntas;
    },
    []
  );

  //Filtro para preguntas respondidas
  const preguntasRespondidas = Object.values(productosPreguntas).reduce(
    (preguntas, producto) => {
      const todasRespondidas = producto.preguntas.every(
        (pregunta) => pregunta.respuesta !== null
      );
      if (todasRespondidas) {
        preguntas.push(producto);
      }
      return preguntas;
    },
    []
  );

  //Estado para mostrar el contenido del botón seleccionado
  const [mostrarContenido, setMostrarContenido] = useState("lista1"); // Por defecto se mostrarán las preguntas pendientes por responder

  //Constantes para los 3 botones de opciones:
  const mostrarPreguntasNoRespondidas = () => {
    setMostrarContenido("lista1");
  };

  const mostrarPreguntasRespondidas = () => {
    setMostrarContenido("lista2");
  };

  const mostrarOpiniones = () => {
    setMostrarContenido("lista3");
  };

  return (
    <div>
      <div className="contenedorBotones">
        <button className="btn1" onClick={mostrarPreguntasNoRespondidas}>
          Mostrar preguntas sin responder{" "}
        </button>
        <br></br>
        <button className="btn2" onClick={mostrarPreguntasRespondidas}>
          Mostrar preguntas respondidas
        </button>
        <br></br>
        <button className="btn3" onClick={mostrarOpiniones}>
          Mostrar opiniones de productos
        </button>
      </div>

      {mostrarContenido === "lista1" && preguntasSinResponder.length > 0 && (
        <div>
          <div className="tituloListas">Lista de preguntas sin responder: </div>
          {preguntasSinResponder.map((producto) => (
            <ItemProductoConPreguntaAdmin
              key={producto.id}
              producto={producto}
              onDeletePregunta={onDeletePregunta}
            />
          ))}
        </div>
      )}
      {preguntasSinResponder.length === 0 && mostrarContenido === "lista1" && (
        <div>
          <br></br>
          <h2>No hay preguntas por responder en este momento.</h2>
        </div>
      )}

      {mostrarContenido === "lista2" && preguntasRespondidas.length > 0 && (
        <div>
          <div className="tituloListas">Lista de preguntas respondidas:</div>
          {preguntasRespondidas.map((producto) => (
            <ItemProductoConPreguntaAdmin
              key={producto.id}
              producto={producto}
              onDeletePregunta={onDeletePregunta}
            />
          ))}
        </div>
      )}
      {preguntasRespondidas.length === 0 && mostrarContenido === "lista2" && (
        <div>
          <br></br>
          <h2>No hay preguntas respondidas en este momento.</h2>
        </div>
      )}
    </div>
  );
}
