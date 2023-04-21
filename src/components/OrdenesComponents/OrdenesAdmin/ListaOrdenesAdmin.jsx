import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemOrdenAdmin } from "./ItemOrdenAdmin";
import "./ListaOrdenesAdmin.css"

export function ListaOrdenesAdmin() {
  // Utilizar el hook useOrdenes para acceder al contexto y las funciones relacionadas con las órdenes
  const { obtenerTodasLasOrdenesConDetalles, ordenesAll } = useOrdenes();

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

  function renderMain() {
    if (ordenesAll.length === 0) {
      return <h1>No hay ordenes registradas</h1>;
    } else {
      return ordenesAll.map((orden) => (
        <ItemOrdenAdmin key={orden.id} orden={orden} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de ordenes:</h2>
      <div className="list-ordenes">
        <table className="tabla-ordenes">
          <thead>
            <tr>
              <th>ID de Orden</th>
              
              <th>Estado de Orden</th>
              <th>ID de Usuario</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Actualización</th>
              <th>Total</th>
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            {renderMain()}
          </tbody>
        </table>
      </div>
    </>
  );
}
