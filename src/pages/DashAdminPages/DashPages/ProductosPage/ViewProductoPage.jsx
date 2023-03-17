/* hook useParams para obtener el id del producto que se pasará en la url */
import { useProductos } from "../../../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../../../components/ProductoComponents/CardProducto.css";

export function ViewProductoPage() {
  const { productos, getImgProducto } = useProductos();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    const productoEncontrado = productos.find((prod) => prod.id === parseInt(id));
    setProducto(productoEncontrado);

  async function cargarImagen() {
    const urlImagen = await getImgProducto(parseInt(id));
    setImagen(urlImagen);
  }

  cargarImagen();
}, [productos, id, getImgProducto]);

  return (
    <div className="card-producto">
      {producto ? (
        <>
          <div>ID: {producto.id}</div>
          <div>Nombre: {producto.nombre}</div>
          <div>Precio: ${producto.precio}</div>
          <div>Stock: {producto.stock}</div>
          <div>Descripción: {producto.descripcion}</div>
          <div>Marca: {producto.marca}</div>
          <div>Modelo: {producto.modelo}</div>
          <div>Color: {producto.color}</div>
          <div>Estado: {producto.estado}</div>
          <div>Categoría: {producto.id_categoria}</div>
          
          {imagen && <img className="card-producto-img" src={imagen} alt={producto.nombre} />}
          
        </>
      ) : (
        <div>No se encontró el producto</div>
      )}
    </div>
  );
}
