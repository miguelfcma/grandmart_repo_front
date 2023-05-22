import React, { useEffect, useState } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConPreguntaAdmin } from "./ItemProductoConPreguntaAdmin";
import { ItemProductoConReviewAdmin } from "./ItemProductoConReviewAdmin";

export function ListaProductoConPreguntasYReviewsAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const {
    getProductosConPreguntasByUsuarioId,
    productosPreguntas,
    eliminarPreguntaProducto,

    getProductosConReviewsByUsuarioId,
    productosReviews,
    eliminarReviewProducto,
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
    const fetchData = async () => {
      try {
        await getProductosConPreguntasByUsuarioId(usuario.id);
        await getProductosConReviewsByUsuarioId(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  

  //Filtro para preguntas sin responder
  const preguntasSinResponder =
  productosPreguntas && Object.values(productosPreguntas).reduce(
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
  const preguntasRespondidas =
  productosPreguntas && Object.values(productosPreguntas).reduce(
    (preguntas, producto) => {
      const preguntasRespondidas = producto.preguntas.filter(
        (pregunta) => pregunta.respuesta !== null
      );
      if (preguntasRespondidas.length > 0) {
        preguntas.push({ ...producto, preguntas: preguntasRespondidas });
      }
      return preguntas;
    },
    []
  );



  const onDeleteReview = async (reviewId) => {
    // Lógica que se ejecuta en el componente padre
    try {
      await eliminarReviewProducto(reviewId);
      console.log("Ejecutando la función en el componente padre");
    } catch (error) {
      console.log(error);
    }
  };

  //Función para mostrar las opiniones sobre los productos que el administrador vende:
  const reviewsPorProducto = productosReviews.reduce((resultado, review) => {
    const idProducto = review.id_producto;
    if (!resultado[idProducto]) {
      resultado[idProducto] = {
        producto: review.producto,
        reviews: [],
      };
    }
    resultado[idProducto].reviews.push(review);
    return resultado;
  }, {});

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


      {mostrarContenido === "lista3" &&
        Object.keys(reviewsPorProducto).length > 0 && (
          <div>
            <div className="tituloListas">
              Lista de todos los reviews registrados:{" "}
            </div>
            {Object.values(reviewsPorProducto).map((producto) => (
              <ItemProductoConReviewAdmin
              key={producto.id}
              producto={producto}
              onDeleteReview={onDeleteReview} // Agrega esta línea
            />
            ))}
          </div>
        )}
      {Object.keys(reviewsPorProducto).length === 0 &&
        mostrarContenido === "lista3" && (
          <div>
            <br></br>
            <h2>No hay reviews registrados por ahora.</h2>
          </div>
        )}


    </div>
  );
}
