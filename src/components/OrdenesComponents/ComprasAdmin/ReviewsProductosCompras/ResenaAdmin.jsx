import React, { useState, useEffect } from "react";
import { FormularioDeResenaAdmin } from "./FormularioDeResenaAdmin"
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";

export function ResenaAdmin({ id_producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [review, setReview] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const { getReviewByUserAndProduct } = useProductos();

  useEffect(() => {
    const verificarResenaExistente = async () => {
      const review = await getReviewByUserAndProduct(usuario.id,id_producto);
      if (review) {
        setReview(review);
        setMostrarFormulario(false);
      }
    };
    verificarResenaExistente();
  }, [getReviewByUserAndProduct, id_producto, usuario.id]);

  const handleMostrarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleReviewSubmit = () => {
    // volver a buscar la revisión después de enviar el formulario
    verificarResenaExistente();
  };

  const verificarResenaExistente = async () => {
    const review = await getReviewByUserAndProduct(usuario.id,id_producto);
    if (review) {
      setReview(review);
      setMostrarFormulario(false);
    } else {
      setReview(null);
      setMostrarFormulario(true);
    }
  };

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
        <FormularioDeResenaCliente
          id_producto={id_producto}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}
