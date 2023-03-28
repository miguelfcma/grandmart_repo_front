/* hook useParams para obtener el id del producto que se pasará en la url */
import { useProductos } from "../../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./ViewProducts.css";

export function ViewDetailsProducts() {
  const { productos, getImgPortadaProducto, getProductImages } = useProductos();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  useEffect(() => {
    const productoEncontrado = productos.find(
      (prod) => prod.id === parseInt(id)
    );
    setProducto(productoEncontrado);

    async function cargarImagen() {
      const urlImagen = await getImgPortadaProducto(parseInt(id));
      const imagenesArray = await getProductImages(parseInt(id));
      setImagenes(imagenesArray);
      setImagen(urlImagen);
    }

    cargarImagen();
  }, [productos, id, getImgPortadaProducto]);

  return (
    <div className="contenedor-producto">
      {producto ? (
        <>
          <div className="info-producto">
            <div>Nombre: {producto.nombre}</div>
            <div>Precio: ${producto.precio}</div>
            <div>Stock: {producto.stock}</div>
            <div>Descripción: {producto.descripcion}</div>
            <div>Marca: {producto.marca}</div>
            <div>Modelo: {producto.modelo}</div>
            <div>Color: {producto.color}</div>
            <div>Estado: {producto.estado}</div>
          </div>

          {imagen && (
            <img
              className="info-producto-img"
              src={imagen}
              alt={producto.nombre}
            />
          )}
          <div className="galeria">
            {imagenes &&
              imagenes.map((imagen) => (
                <img key={imagen.id} src={imagen.url} alt={imagen.id} />
              ))}
          </div>
        </>
      ) : (
        <div>No se encontró el producto</div>
      )}

<button onClick={() => window.history.back()}>
      Regresar
    </button>
    </div>
  );
}
