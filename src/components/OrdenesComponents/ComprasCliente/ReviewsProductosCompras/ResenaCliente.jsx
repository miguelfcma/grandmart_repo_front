import React, { useState, useEffect } from "react";
import { FormularioDeResenaCliente } from "./FormularioDeResenaCliente";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";

export function ResenaCliente({ id_producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [review, setReview] = useState(null);
  const { getReviewByUserAndProduct } = useProductos();

  useEffect(() => {
    verificarResenaExistente();
  }, [id_producto, usuario.id]);

  const verificarResenaExistente = async () => {
    const review = await getReviewByUserAndProduct(usuario.id, id_producto);
    setReview(review);
  };

  const handleReviewSubmit = () => {
    verificarResenaExistente();
  };

  return (
    <div>
      {review ? (
        <div>
          <h3>Tu reseña existente:</h3>
          <p>Título: {review.titulo}</p>
          <p>Comentario: {review.comentario}</p>
          <p>Calificación: {review.calificacion}</p>
        </div>
      ) : (
        <FormularioDeResenaCliente
          id_producto={id_producto}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}
