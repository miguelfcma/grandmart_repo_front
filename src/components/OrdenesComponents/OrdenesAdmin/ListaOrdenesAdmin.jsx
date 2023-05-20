import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemOrdenAdmin } from "./ItemOrdenAdmin";
import { FiltroOrdenesAdmin } from "./FiltroOrdenesAdmin";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ListaOrdenesAdmin.css";
import { ordenesReporteExcel } from "../../GeneracionDeReportes/ordenesReporteExcel";

export function ListaOrdenesAdmin() {
  // Utilizar el hook useOrdenes para acceder al contexto y las funciones relacionadas con las órdenes
  const { obtenerTodasLasOrdenesConDetalles, ordenesAll } = useOrdenes();
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroEstadoOrden, setFiltroEstadoOrden] = useState("");
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroOrden, setFiltroOrden] = useState("");
  const [ordenesFiltradasReporte, setOrdenesFiltradasReporte] = useState([]); // Arreglo de órdenes filtradas

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        await obtenerTodasLasOrdenesConDetalles();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const generarReporte = () => {
    // Array de atributos que se desea incluir en el reporte
    const atributosExcluir = ["updatedAt"];

    ordenesReporteExcel(ordenesFiltradasReporte, atributosExcluir);
  };

  function renderMain() {
    // Filtrar las órdenes en base a los criterios de filtro ingresados por el usuario
    const ordenesFiltradas = ordenesAll.filter(
      (orden) =>
        orden.id_usuario.toString().includes(filtroUsuario) &&
        orden.id.toString().includes(filtroOrden) &&
        orden.estado_orden.includes(filtroEstadoOrden) &&
        (filtroFechaInicio === "" ||
          new Date(orden.createdAt) >= new Date(filtroFechaInicio)) &&
        (filtroFechaFin === "" ||
          new Date(orden.createdAt) <= new Date(filtroFechaFin))
    );
    if (ordenesFiltradasReporte.length != ordenesFiltradas.length) {
      setOrdenesFiltradasReporte(ordenesFiltradas);
    }

    if (ordenesFiltradas.length === 0) {
      return <h1>No hay órdenes registradas</h1>;
    } else {
      return ordenesFiltradas.map((orden) => (
        <ItemOrdenAdmin key={orden.id} orden={orden} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de órdenes:</h2>
      <FiltroOrdenesAdmin
        filtroUsuario={filtroUsuario}
        setFiltroUsuario={setFiltroUsuario}
        filtroEstadoOrden={filtroEstadoOrden}
        setFiltroEstadoOrden={setFiltroEstadoOrden}
        filtroFechaInicio={filtroFechaInicio}
        setFiltroFechaInicio={setFiltroFechaInicio}
        filtroFechaFin={filtroFechaFin}
        setFiltroFechaFin={setFiltroFechaFin}
        filtroOrden={filtroOrden}
        setFiltroOrden={setFiltroOrden}
      />
      {/* Renderizado del botón para generar el reporte */}
      <Button onClick={generarReporte} className="btn-generar-reporte">
        Generar Reporte
      </Button>
      <div className="table-container">
        <div className="list-ordenes">
          <table className="tabla-ordenes">
            <thead>
              <tr>
                <th>ID de Orden</th>
                <th>Estado de Orden</th>
                <th>ID de Usuario</th>
                <th>Fecha de Creación</th>
           
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderMain()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
