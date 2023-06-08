import { useProductos } from "../../../../components/ProductoComponents/ProductosContext/ProductoProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategorias } from "../../../../components/CategoriaComponents/CategoriasContext/CategoriaProvider";
import { SidebarAdmin } from "../../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../../components/DashAdminComponents/HeaderAdmin";
import "./ProductoDetallesAdminPage.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function ProductoDetallesAdminPage() {
  const {
    productosAll,
    getImgPortadaProducto,
    getProductImagesGaleria,
    loadProductos,
  } = useProductos();
  const { id } = useParams();

  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const { categorias, loadCategorias } = useCategorias();

  useEffect(() => {
    window.scrollTo(0, 0); //Para que se muestre el producto desde arriba de la página
    loadCategorias();
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
        setImagen(urlImagen);
      }

      cargarImagen();
    }
  }, [productosAll, id, getImgPortadaProducto, getProductImagesGaleria]);

  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <Breadcrumb
          style={{
            backgroundColor: "#1256a3",
            fontWeight: "bold",
          }}
        >
          <Breadcrumb.Item onClick={() => navigate("/dashAdmin/productos")}>
            Productos
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Detalles del Producto
          </Breadcrumb.Item>
        </Breadcrumb>
        {producto ? (
          <>
            <div className="info-producto">
              <div>ID producto: {producto.id}</div>
              <div>Nombre: {producto.nombre}</div>
              <div>Precio: ${producto.precio} MXN</div>
              <div>Stock: {producto.stock}</div>
              <div>Descripción: {producto.descripcion}</div>
              <div>Marca: {producto.marca}</div>
              <div>Modelo: {producto.modelo}</div>
              <div>Color: {producto.color}</div>
              <div>Estado: {producto.estado ? "Nuevo" : "Usado"}</div>
              <div>
                Categoría:{" "}
                {
                  categorias.find(
                    (categoria) => categoria.id === producto.id_categoria
                  )?.nombre
                }
              </div>
              <div>Publicado por usuario con ID: {producto.id_usuario}</div>
            </div>

            <div className="galeria">
              {imagen && (
                <img
                  className="galeria-img"
                  src={imagen}
                  alt={producto.nombre}
                />
              )}
              {imagenes &&
                imagenes.map((imagen) => (
                  <img
                    key={imagen.id}
                    src={imagen.url}
                    alt={imagen.id}
                    className="galeria-img"
                  />
                ))}
            </div>
          </>
        ) : (
          <div>No se encontró el producto</div>
        )}
        <button onClick={() => window.history.back()} className="back-buttonp">
          Atrás
        </button>{" "}
      </div>
    </div>
  );
}
