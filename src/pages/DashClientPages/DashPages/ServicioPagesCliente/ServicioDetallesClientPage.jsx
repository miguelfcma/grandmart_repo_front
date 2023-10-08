import { useServicios } from "../../../../components/ServicioComponents/ServiciosContext/ServicioProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./ServicioDetallesClientPage.css";
import { useCategorias } from "../../../../components/CategoriaComponents/CategoriasContext/CategoriaProvider";
import { SidebarCliente } from "../../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../../components/DashClientComponents/HeaderCliente";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export function ServicioDetallesClientPage() {
  const {
    serviciosAll,
    getImgPortadaServicio,
    getAllImagesServicio,
    loadServicios,
    obtenerDatosContactoServicio,
  } = useServicios();
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const { categorias, loadCategorias } = useCategorias();
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
    loadCategorias();
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
        setImagen(urlImagen);
      }

      cargarImagen();
    }
  }, [serviciosAll, id, getImgPortadaServicio, getAllImagesServicio]);

  return (
    <div className="dashboard-container">
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <Breadcrumb
          style={{
            backgroundColor: "#1256a3",
            fontWeight: "bold",
          }}
        >
          <Breadcrumb.Item onClick={() => navigate("/dashClient/servicios")}>
            Servicios
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: "white" }}>
            Detalles del Servicio
          </Breadcrumb.Item>
        </Breadcrumb>
        {servicio ? (
          <>
            <div className="info-producto">
              <div>ID: {servicio.id}</div>
              <div>Título: {servicio.titulo}</div>
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
            <div className="galeria">
              {imagen && (
                <img
                  className="galeria-img"
                  src={imagen}
                  alt={servicio.titulo}
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
          <div>No se encontró el servicio </div>
        )}

        <button onClick={() => window.history.back()} className="back-buttonp">
          Atrás
        </button>
      </div>
    </div>
  );
}
