import { useServicios } from "../../../../components/ServicioComponents/ServiciosContext/ServicioProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ServicioDetallesClientPage.css";
import { useCategorias } from "../../../../components/CategoriaComponents/CategoriasContext/CategoriaProvider";
import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";

export function ServicioDetallesClientPage() {
  const {
    serviciosAll,
    getImgPortadaServicio,
    getAllImagesServicio,
    loadServicios,
  } = useServicios();
  const { id } = useParams();

  const [servicio, setServicio] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const { categorias, loadCategorias } = useCategorias();

  useEffect(() => {
    loadCategorias();
    loadServicios();
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
        setImagen(urlImagen);
      }

      cargarImagen();
    }
  }, [serviciosAll, id, getImgPortadaServicio, getAllImagesServicio]);

  return (
    <div className="contenedor-producto" style={{ marginLeft: "200px" }}>
      <HeaderCliente />
      <SidebarCliente />
      {servicio ? (
        <>
          <div className="info-producto">
            <div>ID: {servicio.id}</div>
            <div>Titulo: {servicio.titulo}</div>
            <div>Descripción: {servicio.descripcion}</div>
            <div>
              Categoría:{" "}
              {
                categorias.find(
                  (categoria) => categoria.id === servicio.id_categoria
                )?.nombre
              }
            </div>
          </div>

          <div className="galeria">
            {imagen && (
              <img className="galeria-img" src={imagen} alt={servicio.titulo} />
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
        <div>No se encontró el servicio </div>
      )}

      <button onClick={() => window.history.back()} className="back-buttonp">
        Atrás
      </button>
    </div>
  );
}
