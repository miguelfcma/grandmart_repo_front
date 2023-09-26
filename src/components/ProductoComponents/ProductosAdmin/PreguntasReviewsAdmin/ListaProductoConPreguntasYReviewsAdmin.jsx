import React, { useEffect, useState } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConPreguntaAdmin } from "./ItemProductoConPreguntaAdmin";
import { ItemProductoConReviewAdmin } from "./ItemProductoConReviewAdmin";
import { ItemServicioConPreguntaAdmin } from "./ItemServicioConPreguntaAdmin";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";
import { reviewsReporteExcel } from "../../../GeneracionDeReportes/reviewsReporteExcel";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";

export function ListaProductoConPreguntasYReviewsAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const {
    getProductosConPreguntasByUsuarioId,
    productosPreguntas,
    eliminarPreguntaProducto,

    getProductosConReviewsByUsuarioId,
    productosReviews,
    eliminarReviewProducto,

    obtenerTodasLasReviews,
    productosTodasReviews,
  } = useProductos();

  const {
    getServiciosConPreguntasByUsuarioId,
    serviciosPreguntas,
    eliminarPreguntaServicio,
  } = useServicios();

  const [mostrarTitulo, setMostrarTitulo] = useState(false); // Agregamos el estado para controlar la visibilidad del título

  const onDeletePregunta = async (preguntaId) => {
    try {
      await eliminarPreguntaProducto(preguntaId);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarProductosConReviewsByUsuario = async () => {
    try {
      await getProductosConReviewsByUsuarioId(usuario.id);
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de que ocurra
    }
  };
  const cargarTodasLasReviews = async () => {
    try {
      await obtenerTodasLasReviews();
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de que ocurra
    }
  };

  const cargarProductosConPreguntasByUsuarioId = async () => {
    try {
      await getProductosConPreguntasByUsuarioId(usuario.id);
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de que ocurra
    }
  };

  useEffect(() => {
    cargarProductosConReviewsByUsuario();
    cargarProductosConPreguntasByUsuarioId();
    cargarServiciosConPreguntasByUsuarioId();
  }, []);

  const preguntasSinResponder =
    productosPreguntas &&
    Object.values(productosPreguntas).reduce((preguntas, producto) => {
      const todasRespondidas = producto.preguntas.every(
        (pregunta) => pregunta.respuesta !== null
      );
      if (!todasRespondidas) {
        preguntas.push(producto);
      }
      return preguntas;
    }, []);

  const preguntasRespondidas =
    productosPreguntas &&
    Object.values(productosPreguntas).reduce((preguntas, producto) => {
      const preguntasRespondidas = producto.preguntas.filter(
        (pregunta) => pregunta.respuesta !== null
      );
      if (preguntasRespondidas.length > 0) {
        preguntas.push({ ...producto, preguntas: preguntasRespondidas });
      }
      return preguntas;
    }, []);

  const onDeleteReview = async (reviewId) => {
    try {
      await eliminarReviewProducto(reviewId);
    } catch (error) {
      console.log(error);
    }
  };

  const [mostrarContenido, setMostrarContenido] = useState(false);
  const [mostrarReviewsProductos, setMostrarReviewsProductos] = useState(false);

  const cargarServiciosConPreguntasByUsuarioId = async () => {
    try {
      await getServiciosConPreguntasByUsuarioId(usuario.id);
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de que ocurra
    }
  };

  const preguntasSinResponderServicios =
    serviciosPreguntas &&
    Object.values(serviciosPreguntas).reduce((preguntas, servicio) => {
      const todasRespondidasServicios = servicio.preguntas.every(
        (pregunta) => pregunta.respuesta !== null
      );
      if (!todasRespondidasServicios) {
        preguntas.push(servicio);
      }
      return preguntas;
    }, []);

  const preguntasRespondidasServicios =
    serviciosPreguntas &&
    Object.values(serviciosPreguntas).reduce((preguntas, servicio) => {
      const preguntasRespondidasServicios = servicio.preguntas.filter(
        (pregunta) => pregunta.respuesta !== null
      );
      if (preguntasRespondidasServicios.length > 0) {
        preguntas.push({
          ...servicio,
          preguntas: preguntasRespondidasServicios,
        });
      }
      return preguntas;
    }, []);

  const onDeletePreguntaServicio = async (preguntaId) => {
    try {
      await eliminarPreguntaServicio(preguntaId);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarPreguntasProductosNoRespondidas = () => {
    setMostrarContenido("lista1");
    setMostrarTitulo(1);
  };

  const mostrarPreguntasProductosRespondidas = () => {
    setMostrarContenido("lista2");
    setMostrarTitulo(1);
  };

  const mostrarPreguntasServiciosNoRespondidas = () => {
    setMostrarContenido("lista3");
    setMostrarTitulo(1);
  };

  const mostrarPreguntasServiciosRespondidas = () => {
    setMostrarContenido("lista4");
    setMostrarTitulo(1);
  };

  const mostrarOpinionesProductosPropios = () => {
    setMostrarContenido("lista5");
    setMostrarReviewsProductos(true);
    cargarProductosConReviewsByUsuario();
    setMostrarTitulo(1);
  };

  const mostrarOpinionesSistema = () => {
    setMostrarContenido("lista6");
    cargarTodasLasReviews();
    setMostrarTitulo(1);
  };

  const [calificacionFiltro, setCalificacionFiltro] = useState("");

  const handleCalificacionFiltroChange = (event) => {
    setCalificacionFiltro(event.target.value);
  };

  // Filtrar los productos por la calificación
  let productosFiltrados = productosTodasReviews.filter((producto) => {
    const reviews = producto.reviews;

    if (calificacionFiltro === "") {
      return reviews.length > 0; // Devolver el producto si tiene alguna review
    }

    const calificacion = parseInt(calificacionFiltro);

    return reviews.some((review) => review.calificacion === calificacion);
  });

  // Mapear los productos filtrados para obtener la información deseada
  productosFiltrados = productosFiltrados.map((producto) => {
    const reviews = producto.reviews;

    if (calificacionFiltro === "") {
      return producto; // Devolver el producto sin cambios
    }

    const calificacion = parseInt(calificacionFiltro);

    const reviewsFiltradas = reviews.filter((review) => {
      return review.calificacion === calificacion;
    });

    return {
      producto: producto.producto,
      reviews: reviewsFiltradas.map((review) => ({
        id: review.id,
        titulo: review.titulo,
        comentario: review.comentario,
        calificacion: review.calificacion,
        id_producto: review.id_producto,
        id_usuario: review.id_usuario,
        createdAT: review.createdAT,
      })),
    };
  });

  const generarReporteReviews = () => {
    console.log(productosFiltrados);

    const formattedData = Object.values(productosFiltrados)
      .map((productoReview) => {
        const { producto, reviews } = productoReview;
        return reviews.map((review) => {
          const {
            id,
            titulo,
            comentario,
            calificacion,
            id_producto,
            id_usuario,
          } = review;

          return {
            "ID  de review": id,
            Título: titulo,
            Comentario: comentario,
            Calificacion: calificacion,
            "ID Producto": id_producto,
            "ID Usuario": id_usuario,
          };
        });
      })
      .flat();

    // Ordenar los datos por el ID de reviews de menor a mayor
    formattedData.sort((a, b) => a["ID  de review"] - b["ID  de review"]);

    const atributosExcluir = ["updatedAt"];
    reviewsReporteExcel(formattedData, atributosExcluir);
  };

  return (
    <div>
      <div className="contenedorBotones">
        <button
          className="bton1"
          onClick={mostrarPreguntasProductosNoRespondidas}
        >
          Mostrar las preguntas de sus productos{" "}
        </button>
        <br />
        <button
          className="bton2"
          onClick={mostrarPreguntasServiciosNoRespondidas}
        >
          Mostrar las preguntas de sus servicios{" "}
        </button>
        <br />
        <button className="bton3" onClick={mostrarOpinionesProductosPropios}>
          Mostrar reviews de productos{" "}
        </button>
      </div>

      {mostrarContenido === "lista1" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button
            className="btnPSR"
            onClick={mostrarPreguntasProductosNoRespondidas}
          >
            Preguntas sin responder
          </button>

          <button
            className="btnPR"
            onClick={mostrarPreguntasProductosRespondidas}
          >
            Preguntas respondidas
          </button>

          {preguntasSinResponder.length > 0 &&
            mostrarTitulo === 1 && ( // Mostrar el título solo cuando es verdadero
              <div className="tituloListas">
                Lista de preguntas de sus productos sin responder:
              </div>
            )}
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
          <br />
          <h2>
            No hay preguntas de sus productos por responder en este momento.
          </h2>
        </div>
      )}

      {mostrarContenido === "lista2" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button
            className="btnPSR"
            onClick={mostrarPreguntasProductosNoRespondidas}
          >
            Preguntas sin responder
          </button>

          <button
            className="btnPR"
            onClick={mostrarPreguntasProductosRespondidas}
          >
            Preguntas respondidas
          </button>

          {preguntasRespondidas.length > 0 &&
            mostrarTitulo === 1 && ( // Mostrar el título solo cuando es verdadero
              <div className="tituloListas">
                Lista de preguntas de sus productos respondidas:
              </div>
            )}

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
          <br />
          <h2>
            No hay preguntas de sus productos respondidas en este momento.
          </h2>
        </div>
      )}

      {mostrarContenido === "lista3" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button
            className="btnPSR"
            onClick={mostrarPreguntasServiciosNoRespondidas}
          >
            Preguntas sin responder
          </button>

          <button
            className="btnPR"
            onClick={mostrarPreguntasServiciosRespondidas}
          >
            Preguntas respondidas
          </button>

          {preguntasSinResponderServicios.length > 0 &&
            mostrarTitulo === 1 && ( // Mostrar el título solo cuando es verdadero
              <div className="tituloListas">
                Lista de preguntas de sus servicios sin responder:
              </div>
            )}

          {preguntasSinResponderServicios.map((servicio) => (
            <ItemServicioConPreguntaAdmin
              key={servicio.id}
              servicio={servicio}
              onDeletePreguntaServicio={onDeletePreguntaServicio}
            />
          ))}
        </div>
      )}
      {preguntasSinResponderServicios.length === 0 &&
        mostrarContenido === "lista3" && (
          <div>
            <br />
            <h2>
              No hay preguntas de sus servicios por responder en este momento.
            </h2>
          </div>
        )}

      {mostrarContenido === "lista4" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button
            className="btnPSR"
            onClick={mostrarPreguntasServiciosNoRespondidas}
          >
            Preguntas sin responder
          </button>

          <button
            className="btnPR"
            onClick={mostrarPreguntasServiciosRespondidas}
          >
            Preguntas respondidas
          </button>

          {preguntasRespondidasServicios.length > 0 &&
            mostrarTitulo === 1 && ( // Mostrar el título solo cuando es verdadero
              <div className="tituloListas">
                Lista de preguntas de sus servicios respondidas:
              </div>
            )}

          {preguntasRespondidasServicios.map((servicio) => (
            <ItemServicioConPreguntaAdmin
              key={servicio.id}
              servicio={servicio}
              onDeletePreguntaServicio={onDeletePreguntaServicio}
            />
          ))}
        </div>
      )}
      {preguntasRespondidasServicios.length === 0 &&
        mostrarContenido === "lista4" && (
          <div>
            <br />
            <h2>
              No hay preguntas de sus servicios respondidas en este momento.
            </h2>
          </div>
        )}

      {mostrarContenido === "lista5" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button className="btnRPP">
            Mostrar los reviews de sus productos
          </button>

          <button className="btnRPS" onClick={mostrarOpinionesSistema}>
            Mostrar los reviews de todos los productos del sistema
          </button>

          {productosReviews.length > 0 &&
            mostrarTitulo === 1 && ( // Mostrar el título solo cuando es verdadero
              <div className="tituloListas">
                Lista de reviews acerca de sus productos:
              </div>
            )}
          {productosReviews.map((producto) => (
            <ItemProductoConReviewAdmin
              key={producto.id}
              producto={producto}
              onDeleteReview={onDeleteReview}
            />
          ))}
        </div>
      )}
      {mostrarReviewsProductos.length === 0 &&
        mostrarContenido === "lista5" && (
          <div>
            <br />
            <h2>No hay reviews acerca de sus productos en este momento.</h2>
          </div>
        )}

      {mostrarContenido === "lista6" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button className="btnRPP" onClick={mostrarOpinionesProductosPropios}>
            Mostrar los reviews de sus productos
          </button>

          <button className="btnRPS" onClick={mostrarOpinionesSistema}>
            Mostrar los reviews de todos los productos del sistema
          </button>
          {productosTodasReviews.length > 0 &&
            mostrarTitulo === 1 && ( // Mostrar el título solo cuando es verdadero
              <div className="tituloListas">
                Lista de todas las reviews del sistema:
              </div>
            )}

          <Form inline>
            <FormGroup>
              <FormLabel>Filtrar por calificación mínima:</FormLabel>{" "}
              <FormControl
                as="select"
                value={calificacionFiltro}
                onChange={handleCalificacionFiltroChange}
              >
                <option value="">Todas</option>
                <option value="1">1 estrella</option>
                <option value="2">2 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="5">5 estrellas</option>
              </FormControl>
            </FormGroup>
          </Form>
          <br></br>
          <button onClick={generarReporteReviews} className="btnReporte">
            <box-icon
              style={{ marginRight: "5px" }}
              color="white"
              name="file"
            ></box-icon>
            Generar reporte (.xlsx)
          </button>
          <br></br>
          {productosFiltrados.map((producto) => (
            <ItemProductoConReviewAdmin
              key={producto.id}
              producto={producto}
              onDeleteReview={onDeleteReview}
            />
          ))}
        </div>
      )}
      {productosTodasReviews.length === 0 && mostrarContenido === "lista6" && (
        <div>
          <br />
          <h2>No hay reviews registrados en el sistema en este momento.</h2>
        </div>
      )}
    </div>
  );
}
