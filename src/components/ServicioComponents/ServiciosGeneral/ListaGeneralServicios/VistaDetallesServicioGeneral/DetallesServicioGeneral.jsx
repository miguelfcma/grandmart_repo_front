import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

/* import { ReviewsServicio } from "../ReviewsServicioGeneral/ReviewsServicio"; 

import { PreguntasServicioComponenteCompletoGeneral } from "../PreguntasServicioGeneral/PreguntasServicioComponenteCompletoGeneral";

*/

import "./DetallesServicioGeneral.css";

export function DetallesServicioGeneral({ id, nombre_categoria, nombre_usuario }) {
  const {
    serviciosAll,
    getImgPortadaServicio,
    getAllImagesServicio,
    loadServicios,
  } = useServicios();

  const [servicio, setServicio] = useState(null);
  const [imagenPortada, setImagenPortada] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    loadServicios();
  }, []);

  useEffect(() => {
    const servicioEncontrado = serviciosAll.find(
      (prod) => prod.id === parseInt(id)
    );

    if (servicioEncontrado) {
      setServicio(servicioEncontrado);

      async function cargarImagen() {
        const urlImagen = await getImgPortadaServicio(parseInt(id));
        const imagenesArray = await getAllImagesServicio(parseInt(id));
        setImagenes(imagenesArray);
        setImagenPortada(urlImagen);
      }

      cargarImagen();
    }
  }, [serviciosAll, id, getImgPortadaServicio, getAllImagesServicio]);



  const handleImagenHover = (url) => {
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

  const [imagenZoom, setImagenZoom] = useState(null);

  return (
    <>
      <Container fluid className="contenedor">
        <Col xs={12} md={5} lg={4} className="columna-izquierda">
          <br />
          <br />
          <br />
          <br />
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
        </Col>
        <Col xs={12} md={7} lg={8} className="columna-central">
          <br />
          <br />
          <br />
          <br />
  
          <Row>
            {imagenSeleccionada === null ? (
              <div className="imagen-central-container">
                <img
                  src={imagenPortada}
                  alt="Portada"
                  className="imagen-central"
                />
              </div>
            ) : (
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
          </Row>
        </Col>
  
        <Col xs={8} lg={12} className="columna-derecha">
          <br />
          <br />
          <br />
          <br />
          {servicio && (
            <Col>
              <Card className="infoProducto">
                <div className="d-flex justify-content-end position-absolute top-0 end-0 p-2"></div>
  
                <Card.Title>
                  <div className="infoProductoTitulo">{servicio.nombre}</div>
                </Card.Title>
                <Card.Title>
                  <div className="infoProductoPrecio">${servicio.precio}</div>
                  <br />
  
                  <div className="infoProductoDescripcion">{servicio.descripcion}</div>
                  <br />
  
                  <div className="infoProductoCaracteristicas">
                    <div>Categoría: {servicio.categoria.nombre}</div>
                    <div>Servicio publicado por: {servicio.usuario.nombre}</div>
                  </div>
                </Card.Title>
              </Card>
  
              <br />
  
              <Button
                onClick={() => window.history.back()}
                className="back-button3"
              >
                Atrás
              </Button>
            </Col>
          )}
        </Col>
      </Container>
    </>
  );
}  