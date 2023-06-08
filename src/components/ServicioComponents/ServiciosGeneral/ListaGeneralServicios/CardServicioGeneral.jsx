import "./CardServicioGeneral.css";
import { useServicios } from "../../ServiciosContext/ServicioProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function CardServicioGeneral({ servicio }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const { getImgPortadaServicio } = useServicios();

  const [urlImagen, setUrlImagen] = useState("");
  async function obtenerUrlImagenAsync(idServicio) {
    const url = await getImgPortadaServicio(idServicio);
    setUrlImagen(url);
  }

  useEffect(() => {
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
