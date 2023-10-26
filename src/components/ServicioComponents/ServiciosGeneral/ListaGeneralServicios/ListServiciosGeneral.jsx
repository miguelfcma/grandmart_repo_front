import { useEffect, useState } from "react";
import { CardServicioGeneral } from "./CardServicioGeneral";
import "./ListServicioGeneral.css";
import { useServicios } from "../../ServiciosContext/ServicioProvider";

// Componente que muestra una lista de servicios .
export function ListServiciosGeneral() {
  const { serviciosAll, loadServicios } = useServicios();
  const [currentPage, setCurrentPage] = useState(1);
  const serviciosPerPage = 9;

  useEffect(() => {
    // Carga los servicios al montar el componente.
    loadServicios();
  }, []);

  // Función para renderizar la lista principal de servicios.
  function renderMain() {
    const indexOfLastServicio = currentPage * serviciosPerPage;
    const indexOfFirstServicio = indexOfLastServicio - serviciosPerPage;
    const currentServicios = serviciosAll.slice(
      indexOfFirstServicio,
      indexOfLastServicio
    );

    if (currentServicios.length === 0) {
      return <h1>No hay servicios registrados</h1>;
    } else {
      return currentServicios.map((servicio) => (
        <CardServicioGeneral key={servicio.id} servicio={servicio} />
      ));
    }
  }

  // Función para renderizar la paginación.
  function renderPagination() {
    const totalPages = Math.ceil(serviciosAll.length / serviciosPerPage);

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </a>
      );
    }

    return <div className="pagination">{pages}</div>;
  }

  return (
    <>
      <div className="list-productos">{renderMain()}</div>
      {renderPagination()}
    </>
  );
}
