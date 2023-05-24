import { useContext, useState, useEffect } from "react";

import { OrdenContext } from "./OrdenContext";
import {
  crearOrdenRequest,
  obtenerTodasLasOrdenesConDetallesRequest,
  obtenerDetalleOrdenRequest,
  obtenerDireccionEnvioOrdenRequest,
  obtenerComprasPorIdUsuarioRequest,
  obtenerVentasPorUsuarioRequest,
  verificacionDireccionEnvioRequest,
  cambiarEstadoOrdenRequest,
  cambiarEstadoEnvioRequest,
  cancelarOrdenRequest,
  eliminarOrdenRequest,
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
  const [ventasUser, setVentasUser] = useState([]);

  const crearOrden = async (data) => {
    try {
      const response = await crearOrdenRequest(data);

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("No se pudo crear la orden");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerVentasPorUsuarioId = async (id_usuario) => {
    try {
      const response = await obtenerVentasPorUsuarioRequest(id_usuario);

      if (response.status === 200) {
        setVentasUser(response.data);
      } else {
        throw new Error("No se obtener las ordenes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerComprasPorIdUsuario = async (id_usuario) => {
    try {
      const response = await obtenerComprasPorIdUsuarioRequest(id_usuario);
      console.log(response);
      if (response.status === 200) {
        setOrdenesUser(response.data);
        console.log(response.data);
      } else {
        throw new Error("No se obtener las ordenes");
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
        throw new Error("No se logró obtener las ordenes");
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

  const obtenerDireccionEnvioOrden = async (id_orden) => {
    try {
      const response = await obtenerDireccionEnvioOrdenRequest(id_orden);

      if (response.status === 200) {
  
        return response.data;
      } else {
        throw new Error("No se obtener las ordenes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verificacionDireccionEnvio = async (id_usuario) => {
    try {
      const response = await verificacionDireccionEnvioRequest(id_usuario);
      console.log(response.status);
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarEstadoOrden = async (id_orden, data) => {
    try {
      const response = await cambiarEstadoOrdenRequest(id_orden, data);

      if (response.status === 200) {
        return response;
      } else {
        throw new Error("No se obtener las ordenes");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarEstadoEnvio = async (id_envio, data) => {
    try {
      const response = await cambiarEstadoEnvioRequest(id_envio, data);

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

  const cancelarOrdenDeCompra = async (id_orden) => {
    try {
      const response = await cancelarOrdenRequest(id_orden);

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
  const eliminarOrden = async (id_orden) => {
    try {
      const response = await eliminarOrdenRequest(id_orden);

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

        obtenerDireccionEnvioOrden,
        obtenerVentasPorUsuarioId,
        obtenerComprasPorIdUsuario,
        ventasUser,
        verificacionDireccionEnvio,

        cambiarEstadoOrden,
        cambiarEstadoEnvio,
        cancelarOrdenDeCompra,
        eliminarOrden,
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
};
