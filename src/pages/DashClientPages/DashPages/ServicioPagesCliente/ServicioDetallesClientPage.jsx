import { useServicios } from "../../../../components/ServicioComponents/ServiciosContext/ServicioProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./ServicioDetallesClientPage.css";
import { useCategorias } from "../../../../components/CategoriaComponents/CategoriasContext/CategoriaProvider"

export function ServicioDetallesClientPage() {
  const { serviciosAll, getImgPortadaServicio, getAllImagesServicio, loadServicios } = useServicios();
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
    <div className="contenedor-producto">
      {servicio ? (
        <>
          <div className="info-producto">
            <div>ID: {servicio.id}</div>
            <div>Titulo: {servicio.titulo}</div>
            <div>Descripción: {servicio.descripcion}</div>
            <div>
              Categoría:{" "}
              {categorias.find((categoria) => categoria.id === servicio.id_categoria)?.nombre}
            </div>
          </div>

          {imagen && (
            <img
              className="info-producto-img"
              src={imagen}
              alt={servicio.nombre}
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
        <div>No se encontró el servicio </div>
      )}

      <Link to="/dashClient/servicios" style={{ textDecoration: "none" }}>
        <button className="back-button" type="button">
          <span>Atrás</span>
        </button>
      </Link>
    </div>
  );
}
