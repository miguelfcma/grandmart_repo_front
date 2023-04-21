import { useContext, useState, useEffect } from "react";

import { OrdenContext } from "./OrdenContext";
import {
  crearOrdenRequest,
  obtenerTodasLasOrdenesConDetallesRequest,
  obtenerDetalleOrdenRequest,
  actualizarEstadoOrdenRequest,
} from "../../../API/OrdenesApiRest/ordenes.api";

export const useOrdenes = () => {
  const context = useContext(OrdenContext);
  if (context === undefined) {
    throw new Error(
      "useOrdenes debe ser utilizado dentro de un OrdenContextProvider"
    );
  }
  return context;
};

export const OrdenContextProvider = ({ children }) => {
  const [ordenesAll, setOrdenesAll] = useState([]);
  const [ordenesUser, setOrdenesUser] = useState([]);

  const crearOrden = async (data) => {
    try {
      const response = await crearOrdenRequest(data);

      if (response.status === 201) {
        console.log(response.data);
      } else {
        throw new Error("No se pudo crear la orden");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const obtenerTodasLasOrdenesConDetalles = async () => {
    try {
      const response = await obtenerTodasLasOrdenesConDetallesRequest();

      if (response.status === 200) {
        setOrdenesAll(response.data);
        console.log(response.data);
      } else {
        throw new Error("No se obtener las ordenes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerDetalleOrden = async (id_orden) => {
    try {
      const response = await obtenerDetalleOrdenRequest(id_orden);

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("No se obtener las ordenes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarEstadoOrden = async (id_orden, data) => {
    console.log(id_orden+data)
    try {
      const response = await actualizarEstadoOrdenRequest(id_orden, data);

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("No se obtener las ordenes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrdenContext.Provider
      value={{
        crearOrden,
        obtenerTodasLasOrdenesConDetalles,
        ordenesAll,
        ordenesUser,
        obtenerDetalleOrden,
        actualizarEstadoOrden,
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
};
