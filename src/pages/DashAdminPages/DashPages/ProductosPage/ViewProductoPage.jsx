/* hook useParams para obtener el id del producto que se pasará en la url */
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { useProductos } from "../../../../components/ProductoComponents/ProductosContext/ProductoProvider";

export function ViewProductoPage() {
  const { id } = useParams();
  const { getProductos } = useProductos();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    async function fetchProducto() {
      const response = await getProductos(id);
      setProducto(response);
    }
    fetchProducto();
  }, [getProductos, id]);

  return (
    <div>
      <h1>Detalles del producto</h1>
      <div>ID: {producto.id}</div>
      <div>Nombre: {producto.nombre}</div>
      <div>Precio: ${producto.precio}</div>
      <div>Stock: {producto.stock}</div>
      <div>Descripción: {producto.descripcion}</div>
      <div>Marca: {producto.marca}</div>
      <div>Modelo: {producto.modelo}</div>
      <div>Color: {producto.color}</div>
      <div>Estado: {producto.estado}</div>
      <div>ID de categoría: {producto.id_categoria}</div>
    </div>
  );
}
