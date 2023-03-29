import { useProductos } from "../../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCategorias } from "../../../components/CategoriaComponents/CategoriasContext/CategoriaProvider";

export function ProductosDetallesPage() {
  const { productos, getImgPortadaProducto, getProductImages, loadProductos } = useProductos();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const { categorias, loadCategorias } = useCategorias();

  useEffect(() => {
    loadCategorias();
    loadProductos();
  }, []);

  useEffect(() => {
    const productoEncontrado = productos.find(
      (prod) => prod.id === parseInt(id)
    );

    if (productoEncontrado) {
      setProducto(productoEncontrado);

      async function cargarImagen() {
        const urlImagen = await getImgPortadaProducto(parseInt(id));
        const imagenesArray = await getProductImages(parseInt(id));
        setImagenes(imagenesArray);
        setImagen(urlImagen);
      }

      cargarImagen();
    }
  }, [productos, id, getImgPortadaProducto, getProductImages]);

  return (
    <div className="contenedor-producto">
      {producto ? (
        <>
          <div className="info-producto">
            <div>Nombre: {producto.nombre}</div>
            <div>Precio: ${producto.precio}</div>
            <div>Stock disponible: {producto.stock}</div>
            <div>Descripción: {producto.descripcion}</div>
            <div>Marca: {producto.marca}</div>
            <div>Modelo: {producto.modelo}</div>
            <div>Color: {producto.color}</div>
            <div>Estado: {producto.estado ? "Nuevo" : "Usado"}</div>
            <div>
              Categoría:{" "}
              {categorias.find((categoria) => categoria.id === producto.id_categoria)?.nombre}
            </div>
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
