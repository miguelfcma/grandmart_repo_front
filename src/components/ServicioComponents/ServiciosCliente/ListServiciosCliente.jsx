import React, { useEffect, useState } from "react";
import { CardServicioCliente } from "./CardServicioCliente";
import { useServicios } from "../ServiciosContext/ServicioProvider";

export function ListServiciosCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { serviciosUsuario, loadServiciosUsuario } = useServicios();
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        await loadServiciosUsuario(usuario.id);
      } catch (error) {
        console.log("Error al cargar los servicios:", error);
      }
    }
    fetchData();
  }, []);

  function filtrarServicios() {
    if (filtro === "") {
      return serviciosUsuario;
    } else {
      const filtroLowerCase = filtro.toLowerCase();

      return serviciosUsuario.filter((servicio) => {
        const id = servicio.id.toString().toLowerCase();
        const titulo = servicio.titulo.toLowerCase();

        return (
          id.includes(filtroLowerCase) ||
          titulo.includes(filtroLowerCase)
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
        <CardServicioCliente key={servicio.id} servicio={servicio} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de servicios:</h2>
      <input
        type="text"
        placeholder="Buscar por ID o título"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="bordeFiltro"
      />
      <div className="list-productos">{renderMain()}</div>
    </>
  );
}
