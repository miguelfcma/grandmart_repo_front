import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { ReviewsProducto } from "../ReviewsProductoGeneral/ReviewsProducto";
import "./DetallesProductoGeneral.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { PreguntasProductoComponenteCompletoGeneral } from "../PreguntasProductoGeneral/PreguntasProductoComponenteCompletoGeneral";
import { Modal, Button } from "react-bootstrap";

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
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [imagenHover, setImagenHover] = useState(null);

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

  const handleImagenHover = (url) => {
    setImagenHover(url);
    setImagenSeleccionada(url);
  };

  const [zoomStyle, setZoomStyle] = useState({ visibility: "hidden" });

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const zoomX = ((x / width) * 100).toFixed(2);
    const zoomY = ((y / height) * 100).toFixed(2);
    setZoomStyle({
      visibility: "visible",
      transform: `translate(-${zoomX}%, -${zoomY}%) scale(3)`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ visibility: "hidden" });
  };

  return (
    <div className="contenedor">
      <div className="columna-izquierda">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="imagen-container">
          {imagenPortada && (
            <img
              src={imagenPortada}
              alt="Portada"
              className="imagen-producto"
              onMouseOver={() => handleImagenHover(imagenPortada)}
            />
          )}
          {imagenes &&
            imagenes.map((imagen) => (
              <img
                key={imagen.id}
                src={imagen.url}
                alt={imagen.id}
                className="imagen-producto"
                onMouseOver={() => handleImagenHover(imagen.url)}
              />
            ))}
        </div>
      </div>
      <div className="columna-central">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {imagenSeleccionada && (
          <div
            className="imagen-central-container"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <img
              src={imagenSeleccionada}
              alt="Seleccionada"
              className="imagen-central"
            />
            <div className="zoom-container" style={zoomStyle}>
              <img
                src={imagenSeleccionada}
                alt="Zoom"
                className="zoom-img"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="columna-derecha">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {producto && (
          <>
            <Card className="infoProducto">
              <Card.Title>
                <div className="infoProductoTitulo">{producto.nombre}</div>
              </Card.Title>
              <Card.Title>
                <div className="infoProductoPrecio">$ {producto.precio}</div>
              </Card.Title>
              <Card.Text>
                <div className="infoProductoDescripcion">
                  {producto.descripcion}
                </div>
              </Card.Text>
              <Card.Text>
                <div className="infoProductoCaracteristicas">
                  <div>Marca: {producto.marca}</div>
                  <div>Modelo: {producto.modelo}</div>
                  <div>Color: {producto.color}</div>
                  <div>Estado: {producto.estado ? "Nuevo" : "Usado"}</div>
                  <div>Categoría: {producto.categoria.nombre}</div>
                  <div>Vendido por: {producto.usuario.nombre}</div>
                  <div>Cantidades disponibles: {producto.stock}</div>
                </div>
              </Card.Text>
            </Card>
            <br></br>
            <button onClick={() => window.history.back()}>Regresar</button>
          </>
        )}
      </div>
    </div>
  );
}
