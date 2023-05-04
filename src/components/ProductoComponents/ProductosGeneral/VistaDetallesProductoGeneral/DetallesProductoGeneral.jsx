import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { ReviewsProducto } from "../ReviewsProductoGeneral/ReviewsProducto";
import "./DetallesProductoGeneral.css";
import { PreguntasProductoComponenteCompletoGeneral } from "../PreguntasProductoGeneral/PreguntasProductoComponenteCompletoGeneral.jsx";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function DetallesProductoGeneral({ id }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();
  const {
    getProductoById,
    getImgPortadaProducto,
    getProductImagesGaleria,
    agregarProductoAlCarrito,
    favoritos,
    loadFavoritos,
    agregarFavorito,
    eliminarFavorito,
  } = useProductos();

  const [producto, setProducto] = useState(null);
  const [imagenPortada, setImagenPortada] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); //Para que se muestre el producto desde arriba de la página
    async function fetchData() {
      const productoEncontrado = await getProductoById(id);

      if (productoEncontrado) {
        setProducto(productoEncontrado);

        async function cargarImagen() {
          const urlImagen = await getImgPortadaProducto(parseInt(id));
          const imagenesArray = await getProductImagesGaleria(parseInt(id));
          setImagenes(imagenesArray);
          setImagenPortada(urlImagen);
        }

        await cargarImagen();
      }

      if (usuario && usuario.id) {
        try {
          await loadFavoritos(usuario.id);
          // aquí puedes realizar otras operaciones después de que se haya cargado la lista de favoritos
        } catch (error) {
          // aquí manejas cualquier error que haya ocurrido durante la carga
        }
      }
    }
    if (producto && producto.length > 0) {
      // Aquí va el código de la función
    }else{
      fetchData();
    }
    
  }, []);
  
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

  async function agregarAlCarrito() {
    if (usuario) {
      try {
        await agregarProductoAlCarrito({
          id_usuario: usuario.id,
          id_producto: producto.id,
          cantidad: 1,
        });
        setCarritoTexto("Agregado en tu carrito");
      } catch (error) {
        // Manejar el error, si es necesario
        console.error("Error agregando producto al carrito:", error);
      }
    } else {
      navigate("/login");
    }
  }

  const esProductoFavorito = favoritos.some(
    (favorito) => favorito.id_producto === producto?.id
  );

  function toggleFavorito() {
    if (!usuario) {
      navigate("/login");
      return;
    }

    const id_usuario = usuario.id;
    const id_producto = producto?.id;

    if (!id_producto) {
      console.error("El producto no se ha cargado correctamente");
      return;
    }

    if (esProductoFavorito) {
      eliminarFavorito(id_usuario, id_producto)
        .then(() => {})
        .catch((error) => {
          console.error("Error eliminando producto de favoritos:", error);
        });
    } else {
      agregarFavorito(id_usuario, id_producto)
        .then(() => {})
        .catch((error) => {
          console.error("Error agregando producto a favoritos:", error);
        });
    }
  }

  return (
    <>
      <Container fluid className="contenedor">
        
      <Col xs={12} md={5} lg={4} className="columna-izquierda">
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
        </Col>
        <Col xs={12} md={7} lg={8} className="columna-central">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
         
          <Row>
          {imagenSeleccionada === null ? (
            <img
              src={imagenPortada}
              alt="Portada"
              onMouseOver={() => handleImagenHover(imagenPortada)}
              style={{ height: "450px", marginTop: "61px" }} // Ajustar ancho a tamaño de contenedor
            />
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
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {producto && (
            <>
              <Card className="infoProducto">
                <div className="d-flex justify-content-end position-absolute top-0 end-0 p-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="me-2"
                    onClick={agregarAlCarrito}
                  >
                    <box-icon name="cart-add"></box-icon>
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={toggleFavorito}
                    title={
                      esProductoFavorito
                        ? "Eliminar de favoritos"
                        : "Agregar a favoritos"
                    }
                  >
                    <box-icon
                      type="solid"
                      color={esProductoFavorito ? "red" : "#fbf2f2"}
                      name="heart"
                    ></box-icon>
                  </Button>
                </div>
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
                    <div className="separateIcon">
                    <div >
                      <box-icon name="star" style={{ verticalAlign: "middle" }}></box-icon> Marca: {producto.marca}
                    </div>
                    <div>
                      <box-icon name="barcode" style={{ verticalAlign: "middle" }}></box-icon> Modelo:{" "}
                      {producto.modelo}
                    </div>
                    <div>
                      <box-icon name="palette" style={{ verticalAlign: "middle" }}></box-icon> Color:{" "}
                      {producto.color}
                    </div>
                    <div>
                      <box-icon name="shield-plus" style={{ verticalAlign: "middle" }}></box-icon> Estado:{" "}
                      {producto.estado ? "Nuevo" : "Usado"}
                    </div>
                    <div>
                      <box-icon name="category" style={{ verticalAlign: "middle" }}></box-icon> Categoría:{" "}
                      {producto.categoria.nombre}
                    </div>
                    <div>
                      <box-icon name="user-circle" style={{ verticalAlign: "middle" }}></box-icon> Vendido por:{" "}
                      {producto.usuario.nombre}
                    </div>
                    <div>
                      <box-icon name="package" style={{ verticalAlign: "middle" }}></box-icon> Cantidades
                      disponibles: {producto.stock}
                    </div>
                    </div>
                  </div>
                </Card.Text>
              </Card>
              <br></br>

              <Button
                onClick={() => window.history.back()}
                className="back-button3"
              >
                Atrás
              </Button>
              <br></br>
            </>
          )}
        </Col>
      </Container >
      <PreguntasProductoComponenteCompletoGeneral id_producto={id} />
      <ReviewsProducto id_producto={id} />
    </>
  );
}