import "./CardServicioGeneral.css";
import { useServicios } from "../../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Componente que muestra un servicio en una tarjeta.
export function CardServicioGeneral({ servicio }) {
  // Obtiene la función para obtener la imagen de portada del servicio.
  const { getImgPortadaServicio } = useServicios();

  // Estado para almacenar la URL de la imagen de portada.
  const [urlImagen, setUrlImagen] = useState("");

  // Función asincrónica para obtener la URL de la imagen de portada del servicio.
  async function obtenerUrlImagenAsync(idServicio) {
    const url = await getImgPortadaServicio(idServicio);
    setUrlImagen(url);
  }

  useEffect(() => {
    // Llama a la función para obtener la URL de la imagen cuando cambia el ID del servicio.
    obtenerUrlImagenAsync(servicio.id);
  }, [servicio.id]);

  return (
    <div className="card-producto">
      <Link
        to={`/servicios/detalles/${servicio.id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          className="card-producto-img"
          src={urlImagen}
          alt={servicio.titulo}
        />
        <div>{servicio.titulo}</div>
        <br></br>
        <div>${servicio.precio} MXN</div>
      </Link>
    </div>
  );
}
