import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { ReviewsProducto } from "../ReviewsProductoGeneral/ReviewsProducto";
import "./DetallesProductoGeneral.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { PreguntasProductoComponenteCompletoGeneral } from "../PreguntasProductoGeneral/PreguntasProductoComponenteCompletoGeneral";
import { Modal, Button} from "react-bootstrap";

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

  const [imagenAmpliada, setImagenAmpliada] = useState(null);

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

  function ImgCentralClick(url) {
    setImagenSeleccionada(url);
  }

  function ImagenAmpliada({
    imagen,
    onClose,
    onPrev,
    onNext,
    imagenSeleccionada,
  }) {
    return (
      <Modal show={Boolean(imagen)} onHide={onClose} centered>
      <Modal.Body style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={imagenSeleccionada}
          alt="Ampliada"
          className="imagen-ampliada"
          style={{ width: "90%" }}
        />
        <Button variant="light" className="btn-prev" onClick={onPrev}>
          &#8249;
        </Button>
        <Button variant="light" className="btn-next" onClick={onNext}>
          &#8250;
        </Button>
      </Modal.Body>
    </Modal>
    );
  }

  function handleImagenClick(url) {
    setImagenAmpliada(url);
  }

  function handleImagenClose() {
    setImagenAmpliada(null);
  }

  function handlePrevClick() {
    let index = imagenes.findIndex((obj) => obj.url === imagenSeleccionada);
    if (imagenSeleccionada === imagenPortada) {
      setImagenSeleccionada(imagenes[imagenes.length - 1].url);
      setIndiceActual(imagenes.length - 1);
    } else if (index > 0) {
      setImagenSeleccionada(imagenes[index - 1].url);
      setIndiceActual(index - 1);
    } else {
      setImagenSeleccionada(imagenPortada);
      setIndiceActual(-1);
    }
  }
  
  function handleNextClick() {
    let index = imagenes.findIndex((obj) => obj.url === imagenSeleccionada);
    if (index === -1) {
      setImagenSeleccionada(imagenes[0].url);
      setIndiceActual(0);
    } else if (index === imagenes.length - 1) {
      setImagenSeleccionada(imagenPortada);
      setIndiceActual(-1);
    } else {
      setImagenSeleccionada(imagenes[index + 1].url);
      setIndiceActual(index + 1);
    }
  }

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
            onClick={() => handleImagenClick(imagenSeleccionada)}
          >
            <img
              src={imagenSeleccionada}
              alt="Seleccionada"
              className="imagen-central"
            />
          </div>
        )}
      <ImagenAmpliada
        imagen={imagenAmpliada}
        onClose={handleImagenClose}
        onPrev={handlePrevClick}
        onNext={handleNextClick}
        imagenSeleccionada={imagenSeleccionada}
      />
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
