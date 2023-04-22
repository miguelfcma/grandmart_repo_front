import React, { useEffect } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import {ItemProductoConPreguntaAdmin} from "./ItemProductoConPreguntaAdmin";

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

  return (
    <div>
      {/* Mostrar los productos con preguntas en tu componente */}
      {productosPreguntas.map(producto => (
        <ItemProductoConPreguntaAdmin key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
