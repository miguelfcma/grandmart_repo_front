import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useEffect, useState } from "react";
import { useCategorias } from "../../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { ComentariosProducto } from "../ComentariosProductoGeneral/ComentariosProducto";
import { ReviewsProducto } from "../ReviewsProductosGeneral/ReviewsProducto";

export  function DetallesProductoGeneral({id}) {
    const { productos, getImgPortadaProducto, getProductImagesGaleria, loadProductos } = useProductos();
  
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
          const imagenesArray = await getProductImagesGaleria(parseInt(id));
          setImagenes(imagenesArray);
          setImagen(urlImagen);
        }
  
        cargarImagen();
      }
    }, [productos, id, getImgPortadaProducto, getProductImagesGaleria]);
  
    return (
<div className="contenedor-producto detalles-producto" style={{ paddingTop: "80px" }}>

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
  <ComentariosProducto/>
  <ReviewsProducto/>
  <button onClick={() => window.history.back()}>
        Regresar
      </button>
      </div>
    );
  }
  