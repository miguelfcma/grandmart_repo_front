import { useContext, useState, useEffect } from "react";

// Importa el contexto de órdenes definido en "OrdenContext.js"
import { OrdenContext } from "./OrdenContext";
// Importa las funciones para interactuar con una API de órdenes
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
  obtenerInformacionPagoRequest
} from "../../../API/OrdenesApiRest/ordenes.api";

// Definición de un gancho personalizado para acceder al contexto de órdenes
export const useOrdenes = () => {
  const context = useContext(OrdenContext);
  if (context === undefined) {
    // Si el contexto es nulo, se lanza un error
    throw new Error(
      "useOrdenes debe ser utilizado dentro de un OrdenContextProvider"
    );
  }
  return context;
};

// Definición del proveedor del contexto de órdenes
export const OrdenContextProvider = ({ children }) => {
  // Estados para almacenar órdenes y ventas
  const [ordenesAll, setOrdenesAll] = useState([]);
  const [ordenesUser, setOrdenesUser] = useState([]);
  const [ventasUser, setVentasUser] = useState([]);

  // Función para borrar los datos de órdenes al cerrar sesión
  const cerrarSesionOrdenes = () => {
    setOrdenesAll([]);
    setOrdenesUser([]);
    setVentasUser([]);
  };

  // Función para crear una nueva orden
  const crearOrden = async (data) => {
    try {
      const response = await crearOrdenRequest(data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener las ventas de un usuario por su ID
  const obtenerVentasPorUsuarioId = async (id_usuario) => {
    try {
      const response = await obtenerVentasPorUsuarioRequest(id_usuario);

      if (response.status === 200) {
        setVentasUser(response.data);
      } else {
        throw new Error("obtenerVentasPorUsuarioId");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener las compras de un usuario por su ID
  const obtenerComprasPorIdUsuario = async (id_usuario) => {
    try {
      const response = await obtenerComprasPorIdUsuarioRequest(id_usuario);
      console.log(response);
      if (response.status === 200) {
        setOrdenesUser(response.data);
        console.log(response.data);
      } else {
        throw new Error(" obtenerCompras");
      }
    } catch (error) {
      console.error(error);
    }
  };

   // Función para obtener todas las ordenes
  const obtenerTodasLasOrdenesConDetalles = async () => {
    try {
      const response = await obtenerTodasLasOrdenesConDetallesRequest();

      if (response.status === 200) {
        setOrdenesAll(response.data);
        console.log(response.data);
      } else {
        throw new Error("No se logró obtener las órdenes");
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
        throw new Error("obtenerDetalleOrden");
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
        throw new Error("obtenerDireccionEnvioOrden");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verificacionDireccionEnvio = async (id_usuario) => {
    try {
      const response = await verificacionDireccionEnvioRequest(id_usuario);

      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarEstadoOrden = async (id_orden, data) => {
    try {
      const response = await cambiarEstadoOrdenRequest(id_orden, data);

      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarEstadoEnvio = async (id_envio, data) => {
    try {
      const response = await cambiarEstadoEnvioRequest(id_envio, data);

      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  const cancelarOrdenDeCompra = async (id_orden) => {
    try {
      const response = await cancelarOrdenRequest(id_orden);
      return response.status;
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarOrden = async (id_orden) => {
    try {
      const response = await eliminarOrdenRequest(id_orden);

      if (response.status === 200) {
        console.log(response.data);
      }
      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerInformacionPago = async (id_orden) => {
    try {
      const response = await obtenerInformacionPagoRequest(id_orden);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error al obtener información de pago");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // El contexto proporciona las funciones y estados a los componentes hijos
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

        cerrarSesionOrdenes,
        obtenerInformacionPago,
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
};
