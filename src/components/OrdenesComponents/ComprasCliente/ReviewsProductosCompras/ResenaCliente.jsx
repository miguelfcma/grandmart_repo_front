import React, { useState, useEffect } from "react";
import { FormularioDeResenaCliente } from "./FormularioDeResenaCliente";
import { useProductos } from "../../../ProductoComponents/ProductosContext/ProductoProvider";
import "./ResenaCliente.css";
export function ResenaCliente({ id_producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [review, setReview] = useState(null);
  const { getReviewByUserAndProduct } = useProductos();

  useEffect(() => {
    verificarResenaExistente();
  }, []);

  const verificarResenaExistente = async () => {
    const review = await getReviewByUserAndProduct(usuario.id, id_producto);
    setReview(review);
  };

  const handleReviewSubmit = () => {
    verificarResenaExistente();
  };

  return (
    <div className="resena-cliente">
      {review ? (
        <div className="resena-existente">
          <h3 className="titulo-resena">Tu reseña existente:</h3>
          <p className="titulo-resena-texto">Título: {review.titulo}</p>
          <p className="comentario-resena">Comentario: {review.comentario}</p>
          <p className="calificacion-resena">Calificación: {review.calificacion}</p>
        </div>
      ) : (
        <FormularioDeResenaCliente
          id_producto={id_producto}
          onReviewSubmit={handleReviewSubmit}
          className="formulario-resena"
        />
      )}
    </div>
  );
}
