import "./CardProducto.css";
import { useProductos } from "../ProductosContext/ProductoProvider";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { deleteImagesProducto } from "../../../firebase/productoStorage";

export function CardProducto({ producto }) {
  const { deleteProducto, getImgPortadaProducto, getAllImagesProduct } =
    useProductos();
  const [imagenes, setImagenes] = useState(null);
  const [urlImagen, setUrlImagen] = useState("");

  async function obtenerUrlImagenAsync(idProducto) {
    const url = await getImgPortadaProducto(idProducto);
    setUrlImagen(url);
  }

  useEffect(() => {
    obtenerUrlImagenAsync(producto.id);
  }, [producto.id]);

  const handleEliminarProducto = async () => {
    try {
      const imagenesProducto = await getAllImagesProduct(producto.id);
      const urls = imagenesProducto.map((imagen) => imagen.url);

      await deleteImagesProducto(urls);
      await deleteProducto(producto.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card-producto">
      <div>ID: {producto.id}</div>
      <div>Nombre: {producto.nombre}</div>
      <img
        className="card-producto-img"
        src={urlImagen}
        alt={producto.nombre}
      />
      <div>Precio: ${producto.precio}</div>

      <Link
        to={`/dashAdmin/productos/ver/${producto.id}`}
        style={{ textDecoration: "none" }}
      >
        <button className="card-producto">
          <span>Ver producto</span>
        </button>
      </Link>

      <button className="card-producto" onClick={handleEliminarProducto}>
        Eliminar producto
      </button>
    </div>
  );
}
