import { useServicios } from "../../../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";

/* import { ReviewsServicio } from "../ReviewsServicioGeneral/ReviewsServicio"; 

import { PreguntasServicioComponenteCompletoGeneral } from "../PreguntasServicioGeneral/PreguntasServicioComponenteCompletoGeneral";

*/

import "./DetallesServicioGeneral.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

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

  const [setZoom] = useState(1);
  const handleZoomIn = () => {
    setZoom(1.5);
  };
  const handleZoomOut = () => {
    setZoom(1);
  };

  const [imagenZoom, setImagenZoom] = useState(null);

  return (
    <div className="contenedor">
    <div>
      {servicio && (
        <>
          <div className="infoProductoTitulo">
            <Card.Title style={{ fontSize: "25px" }}>
              {servicio.titulo}
            </Card.Title>
          </div>
          <br></br>
          <div className="galeria">
          <div
              className="imagenAmpliada"
              style={{ display: imagenZoom ? "block" : "none" }}
            >
              <img src={imagenZoom} alt="Imagen ampliada" />
            </div>
            <CardGroup>
              {imagenPortada && (
                <Card>
                  <Card.Img
                    variant="top"
                    src={imagenPortada}
                    alt="Portada"
                    className={imagenPortada === imagenZoom ? "zoom" : ""}
                    onMouseEnter={() => setImagenZoom(imagenPortada)}
                    onMouseLeave={() => setImagenZoom(null)}
                  />
                </Card>
              )}
              {imagenes &&
                imagenes.map((imagen) => (
                  <Card key={imagen.id}>
                    <Card.Img
                      variant="top"
                      src={imagen.url}
                      alt={imagen.id}
                      className={imagen.url === imagenZoom ? "zoom" : ""}
                      onMouseEnter={() => setImagenZoom(imagen.url)}
                      onMouseLeave={() => setImagenZoom(null)}
                    />
                  </Card>
                ))}
            </CardGroup>
          </div>

          <div className="infoProducto">
            <Card
              style={{
                width: "98%",
                margin: "0 auto",
                padding: "15px 20px 15px 20px",
              }}
            >
              <Card.Title>
                <div className="infoProductoPrecio">${servicio.precio}</div>
                <br></br>

                <div className="infoProductoDescripcion">{servicio.descripcion}</div>
                <br></br>

                <div className="infoProductoCaracteristicas">
                  <div>Categoría: {servicio.categoria.nombre}</div>
                  <div>Servicio publicado por: {servicio.usuario.nombre}</div>
                </div>
              </Card.Title>
            </Card>

            <br></br>

            <button onClick={() => window.history.back()}>Regresar</button>
            
          </div>
        </>
        
      )}
    </div>
    </div>
  );
}
