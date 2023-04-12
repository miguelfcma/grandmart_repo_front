import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { ComentariosProducto } from "../ComentariosProductoGeneral/ComentariosProducto";
import { ReviewsProducto } from "../ReviewsProductosGeneral/ReviewsProducto";
import styles from "./DetallesProductoGeneral.module.css";

export function DetallesProductoGeneral({ id }) {
  const {
    productosAll,
    getImgPortadaProducto,
    getProductImagesGaleria,
    loadProductos,
  } = useProductos();

  const [producto, setProducto] = useState(null);
  const [imagenPortada, setImagenPortada] = useState(null);
  const [imagenes, setImagenes] = useState(null);

  useEffect(() => {
    loadProductos();
  }, []);

  useEffect(() => {
    const productoEncontrado = productosAll.find(
      (prod) => prod.id === parseInt(id)
    );

    if (productoEncontrado) {
      setProducto(productoEncontrado);

      async function cargarImagen() {
        const urlImagen = await getImgPortadaProducto(parseInt(id));
        const imagenesArray = await getProductImagesGaleria(parseInt(id));
        setImagenes(imagenesArray);
        setImagenPortada(urlImagen);
      }

      cargarImagen();
    }
  }, [productosAll, id, getImgPortadaProducto, getProductImagesGaleria]);

  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => {
    setZoom(1.5);
  };
  const handleZoomOut = () => {
    setZoom(1);
  };

  const [imagenZoom, setImagenZoom] = useState(null);


  return (
    <div className={styles.container}>
      <div className={styles.galeria}>
        {imagenes &&
          imagenes.map((imagen) => (
            <img key={imagen.id} src={imagen.url} alt={imagen.id}
            className={imagen.url === imagenZoom ? styles.zoom : ""}
            onMouseEnter={() => setImagenZoom(imagen.url)}
            onMouseLeave={() => setImagenZoom(null)}/>
          ))}
        <div>
          <img
          src={imagenPortada}
          onMouseOver={handleZoomIn}
          onMouseOut={handleZoomOut}
          style={{ transform: `scale(${zoom})` }}
          ></img>
        </div>
      </div>
      <div className={styles.infoProducto}>
        {producto ? (
          <>
            <div className={styles.infoProductoTitulo}>{producto.nombre}</div>
            <div className={styles.infoProductoPrecio}>${producto.precio}</div>
            <div className={styles.infoProductoDescripcion}>
              {producto.descripcion}
            </div>
            <div className={styles.infoProductoCaracteristicas}>
              <div>Marca: {producto.marca}</div>
              <div>Modelo: {producto.modelo}</div>
              <div>Color: {producto.color}</div>
              <div>Estado: {producto.estado ? "Nuevo" : "Usado"}</div>
              <div>Categoría: {producto.categoria.nombre}</div>
              <div>Producto públicado por: {producto.usuario.nombre}</div>
            </div>
            <button onClick={() => window.history.back()}>Regresar</button>
            <ComentariosProducto />
            <ReviewsProducto />
          </>
        ) : (
          <div>No se encontró el producto</div>
        )}
      </div>
    </div>
  );
}
