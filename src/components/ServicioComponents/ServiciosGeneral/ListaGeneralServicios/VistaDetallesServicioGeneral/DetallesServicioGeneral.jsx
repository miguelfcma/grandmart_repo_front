import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";
import { PreguntasServicioComponenteCompletoGeneral } from "../../PreguntasServicioGeneral/PreguntasServicioComponenteCompletoGeneral";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./DetallesServicioGeneral.css";

export function DetallesServicioGeneral({ id }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();
  const {
    serviciosAll,
    getImgPortadaServicio,
    getAllImagesServicio,
    loadServicios,
    obtenerDatosContactoServicio,
  } = useServicios();

  const [servicio, setServicio] = useState(null);
  const [imagenPortada, setImagenPortada] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [datosContacto, setDatosContacto] = useState(null);
  const fetchDatosContacto = async () => {
    try {
      const data = await obtenerDatosContactoServicio(id);

      setDatosContacto(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadServicios();
    fetchDatosContacto();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); //Para que se muestre el producto desde arriba de la página
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
                <Card.Title>
                  <div className="infoProductoTitulo">{servicio.titulo}</div>
                </Card.Title>
                <Card.Title>
                  <div className="infoProductoPrecio">${servicio.precio}</div>
                </Card.Title>
                <div className="infoProductoDescripcion">
                  {servicio.descripcion}
                </div>
                <br />
                <div className="infoProductoCaracteristicas">
                  <div className="separateIcon">
                    <div>
                      <box-icon
                        name="category"
                        style={{ verticalAlign: "middle" }}
                      ></box-icon>{" "}
                      Categoría: {servicio.categoria.nombre}
                    </div>
                    <div>
                      <box-icon
                        name="user-circle"
                        style={{ verticalAlign: "middle" }}
                      ></box-icon>{" "}
                      Servicio publicado por: {servicio.usuario.nombre}
                    </div>
                  </div>
                </div>
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
      <Container fluid className="contenedor">
        {datosContacto ? (
          <div>
            <div className="info-producto">
              <p>Teléfono 1: {datosContacto.telefono1}</p>
              <p>Teléfono 2: {datosContacto.telefono2}</p>
              <p>Email: {datosContacto.email}</p>
              <p>Estado: {datosContacto.estado}</p>
              <p>Municipio/Alcaldía: {datosContacto.municipio_alcaldia}</p>
              <p>Colonia: {datosContacto.colonia}</p>
              <p>Calle: {datosContacto.calle}</p>
              <p>Número Exterior: {datosContacto.numeroExterior}</p>
              <p>Número Interior: {datosContacto.numeroInterior}</p>
              <p>Descripción: {datosContacto.descripcion}</p>
            </div>
          </div>
        ) : (
          <p>No hay más datos de servicio</p>
        )}
      </Container>
      <PreguntasServicioComponenteCompletoGeneral id_servicio={id} />
      <Card>
        <Card.Header style={{ textAlign: "right" }}>
          <Link
            to={usuario ? `/denuncia/servicio/${id}` : "/login"}
            style={{
              textDecoration: "none",
              marginTop: "10px",
            }}
          >
            Denunciar publicación
          </Link>
        </Card.Header>
      </Card>
    </>
  );
}
