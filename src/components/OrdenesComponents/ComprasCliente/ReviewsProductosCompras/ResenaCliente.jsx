// Importación de módulos y componentes de React
import React, { useState, useEffect } from "react";
import { FormularioDeResenaCliente } from "./FormularioDeResenaCliente";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";
import "./ResenaCliente.css";

// Definición del componente "ResenaCliente"
export function ResenaCliente({ id_producto }) {
  // Obtiene información del usuario actual del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estado local para almacenar la reseña existente
  const [review, setReview] = useState(null);

  // Obtiene la función para obtener una reseña del contexto de productos
  const { getReviewByUserAndProduct } = useProductos();

  // Efecto de useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Llama a la función para verificar la existencia de una reseña
    verificarResenaExistente();
  }, []);

  // Función para verificar la existencia de una reseña
  const verificarResenaExistente = async () => {
    const review = await getReviewByUserAndProduct(usuario.id, id_producto);
    setReview(review);
  };

  // Función que se llama cuando se envía una reseña
  const handleReviewSubmit = () => {
    verificarResenaExistente();
  };

  // Renderiza el componente de la reseña del cliente
  return (
    <div className="resena-cliente">
      {review ? (
        // Si existe una reseña, muestra la reseña existente
        <div className="resena-existente">
          <h3 className="titulo-resena">Tu reseña existente:</h3>
          <p className="titulo-resena-texto">Título: {review.titulo}</p>
          <p className="comentario-resena">Comentario: {review.comentario}</p>
          <p className="calificacion-resena">Calificación: {review.calificacion}</p>
        </div>
      ) : (
        // Si no existe una reseña, muestra el formulario de reseña
        <FormularioDeResenaCliente
          id_producto={id_producto}
          onReviewSubmit={handleReviewSubmit}
          className="formulario-resena"
        />
      )}
    </div>
  );
}
