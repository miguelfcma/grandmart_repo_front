import React, { useEffect, useState } from "react";
import { CardServicioAdmin } from "./CardServicioAdmin";
import { useServicios } from "../ServiciosContext/ServicioProvider";

export function ListServiciosAdmin() {
  const { serviciosAll, loadServicios } = useServicios();
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    loadServicios();
  }, []);

  function filtrarServicios() {
    if (filtro === "") {
      return serviciosAll;
    } else {
      const filtroLowerCase = filtro.toLowerCase();

      return serviciosAll.filter((servicio) => {
        const id = servicio.id.toString().toLowerCase();
        const titulo = servicio.titulo.toLowerCase();
        const idUsuario = servicio.id_usuario.toString().toLowerCase();

        return (
          id.includes(filtroLowerCase) ||
          titulo.includes(filtroLowerCase) ||
          idUsuario.includes(filtroLowerCase)
        );
      });
    }
  }

  function renderMain() {
    const serviciosFiltrados = filtrarServicios();

    if (serviciosFiltrados.length === 0) {
      return <h1>No hay servicios registrados</h1>;
    } else {
      return serviciosFiltrados.map((servicio) => (
        <CardServicioAdmin key={servicio.id} servicio={servicio} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de servicios:</h2>
      <input
        type="text"
        placeholder="Buscar por ID, título o ID del usuario"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="bordeFiltro"
      />
      <div className="list-productos">{renderMain()}</div>
    </>
  );
}
