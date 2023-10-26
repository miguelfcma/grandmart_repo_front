import React, { useState, useEffect } from "react";
import { FormularioDeResenaAdmin } from "./FormularioDeResenaAdmin";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";

// Definición del componente "ResenaAdmin"
export function ResenaAdmin({ id_producto }) {
  // Obtiene información del usuario del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estados locales para la reseña, visibilidad del formulario y funciones del contexto
  const [review, setReview] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const { getReviewByUserAndProduct } = useProductos();

  // Efecto de useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Función asincrónica para verificar si el usuario ya ha realizado una reseña
    const verificarResenaExistente = async () => {
      // Obtiene la reseña del usuario y producto específicos
      const review = await getReviewByUserAndProduct(usuario.id, id_producto);
      
      // Si existe una reseña, se establece en el estado y se oculta el formulario
      if (review) {
        setReview(review);
        setMostrarFormulario(false);
      }
    };
    
    // Llama a la función de verificación de reseña existente
    verificarResenaExistente();
  }, [getReviewByUserAndProduct, id_producto, usuario.id]);

  // Función para alternar la visibilidad del formulario
  const handleMostrarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  // Función para manejar la presentación de la reseña después de enviar el formulario
  const handleReviewSubmit = () => {
    // Vuelve a buscar la revisión después de enviar el formulario
    verificarResenaExistente();
  };

  // Función asincrónica para verificar si el usuario ya ha realizado una reseña
  const verificarResenaExistente = async () => {
    const review = await getReviewByUserAndProduct(usuario.id, id_producto);
    
    // Si existe una reseña, se establece en el estado y se oculta el formulario
    if (review) {
      setReview(review);
      setMostrarFormulario(false);
    } else {
      // Si no existe una reseña, se restablece el estado para mostrar el formulario
      setReview(null);
      setMostrarFormulario(true);
    }
  };

  // Renderiza el componente
  return (
    <div>
      {mostrarFormulario && (
        <button onClick={handleMostrarFormulario}>
          Opinar sobre el producto
        </button>
      )}
      {!mostrarFormulario && (
        <div>
          <h3>Tu reseña existente:</h3>
          <p>Título: {review.titulo}</p>
          <p>Comentario: {review.comentario}</p>
          <p>Calificación: {review.calificacion}</p>
        </div>
      )}
      {mostrarFormulario && (
        <FormularioDeResenaAdmin
          id_producto={id_producto}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}
