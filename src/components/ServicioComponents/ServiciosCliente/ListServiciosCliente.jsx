import React, { useEffect, useState } from "react";
import { CardServicioCliente } from "./CardServicioCliente";
import { useServicios } from "../ServiciosContext/ServicioProvider";

/**
 * Componente que muestra una lista de servicios para un cliente.
 * Permite buscar y filtrar los servicios por ID o título.
 * Utiliza el contexto de servicios para cargar y mostrar los datos.
 */
export function ListServiciosCliente() {
  // Obtiene al usuario desde el almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Obtiene funciones y datos relacionados con servicios desde el contexto
  const { serviciosUsuario, loadServiciosUsuario } = useServicios();

  // Estado local para el filtro de búsqueda
  const [filtro, setFiltro] = useState("");

  // Carga los servicios del usuario al montar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        await loadServiciosUsuario(usuario.id);
      } catch (error) {
        console.log("Error al cargar los servicios:", error);
      }
    }
    fetchData(); // Llama a fetchData al montar el componente
  }, []); // El segundo argumento del useEffect vacío indica que solo se ejecuta al montar el componente

  // Filtra los servicios basados en el filtro de búsqueda
  function filtrarServicios() {
    if (filtro === "") {
      return serviciosUsuario;
    } else {
      const filtroLowerCase = filtro.toLowerCase();

      return serviciosUsuario.filter((servicio) => {
        const id = servicio.id.toString().toLowerCase();
        const titulo = servicio.titulo.toLowerCase();

        return id.includes(filtroLowerCase) || titulo.includes(filtroLowerCase);
      });
    }
  }

  // Renderiza los servicios en la interfaz de usuario
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
