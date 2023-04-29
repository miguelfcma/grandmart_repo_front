import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { ReviewsProducto } from "../ReviewsProductoGeneral/ReviewsProducto";
import "./DetallesProductoGeneral.css";
import Card from "react-bootstrap/Card";
import {PreguntasProductoComponenteCompletoGeneral} from "../PreguntasProductoGeneral/PreguntasProductoComponenteCompletoGeneral.jsx"
import Button from "react-bootstrap/Button";


export function DetallesProductoGeneral({ id }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const {
    productosAll,
    getImgPortadaProducto,
    getProductImagesGaleria,
    loadProductos,
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
  const [imagenHover, setImagenHover] = useState(null);

  useEffect(() => {
    loadProductos();
    window.scrollTo(0, 0); //Para que muestre el producto desde arriba de la página
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

  const [carritoTexto, setCarritoTexto] = useState("Agregar al carrito");
  const [favoritosTexto, setFavoritosTexto] = useState("Agregar a favoritos");

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

  useEffect(() => {
    if (usuario && usuario.id) {
      loadFavoritos(usuario.id);
    }
  }, []);
  const [esFavorito, setEsFavorito] = useState(false);
  const esProductoFavorito = favoritos.some(
    (favorito) => favorito.id_producto === producto
  );

  async function toggleFavorito() {
    if (usuario && usuario.id) {
      if (esProductoFavorito) {
        try {
          const favorito = favoritos.find(
            (favorito) => favorito.id_producto === producto.id
          );
          await eliminarFavorito(usuario.id, producto.id);
          setFavoritosTexto("Agregar a favoritos");
        } catch (error) {
          // Manejar el error, si es necesario
          console.error("Error eliminando producto de favoritos:", error);
        }
      } else {
        try {
          await agregarFavorito(usuario.id, producto.id);
          setFavoritosTexto("Agregado a tus favoritos");
        } catch (error) {
          // Manejar el error, si es necesario
          console.error("Error agregando producto a favoritos:", error);
        }
      }
      setEsFavorito(!esFavorito);
    } else {
      navigate("/login");
    }
  }

  return (
    <>
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
            <Button
              variant="primary"
              size="lg"
              className="btnCar"
              onClick={agregarAlCarrito}
            >
              {carritoTexto}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="btnFav"
              onClick={toggleFavorito}
            >
              {favoritosTexto}
            </Button>
            <button
              onClick={() => window.history.back()}
              className="back-button3"
            >
              Atrás
            </button>
            <br></br>
          </>
        )}
      </div>
      
    </div>
    <PreguntasProductoComponenteCompletoGeneral  id_producto={ id}/>
      <ReviewsProducto id_producto={ id} />
    </>
  );
}
