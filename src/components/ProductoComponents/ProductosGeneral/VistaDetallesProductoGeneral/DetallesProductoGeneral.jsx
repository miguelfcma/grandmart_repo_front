import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";

import { ReviewsProducto } from "../ReviewsProductoGeneral/ReviewsProducto";
import "./DetallesProductoGeneral.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { PreguntasProductoComponenteCompletoGeneral } from "../PreguntasProductoGeneral/PreguntasProductoComponenteCompletoGeneral";

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
      {producto && (
        <>
          <div className="infoProductoTitulo">
            <Card.Title style={{ fontSize: "25px" }}>
              {producto.nombre}
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
                <div className="infoProductoPrecio">${producto.precio}</div>
                <br></br>

                <div className="infoProductoDescripcion">{producto.descripcion}</div>
                <br></br>

                <div className="infoProductoCaracteristicas">
                  <div>Marca: {producto.marca}</div>
                  <div>Modelo: {producto.modelo}</div>
                  <div>Color: {producto.color}</div>
                  <div>Estado: {producto.estado ? "Nuevo" : "Usado"}</div>
                  <div>Categoría: {producto.categoria.nombre}</div>
                  <div>Producto públicado por: {producto.usuario.nombre}</div>
                  <div>Cantidades disponibles: {producto.stock}</div>
                </div>
              </Card.Title>
            </Card>

            <br></br>

            <button onClick={() => window.history.back()}>Regresar</button>
            
          </div>
          <PreguntasProductoComponenteCompletoGeneral  id_producto={producto.id}/>
          <ReviewsProducto/>
        </>
        
      )}
    </div>
    </div>
  );
}
