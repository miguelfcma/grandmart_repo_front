import { useContext, useState, useEffect } from "react";

import {
  getServiciosRequest,
  createServicioRequest,
  deleteServicioRequest,
  updateServicioRequest,
} from "../../../API/ServiciosApiRest/servicios.api";
import { createImagenesRequest } from "../../../API/ServiciosApiRest/imagenServicio.api";
import { ServicioContext } from "./ServicioContext";

export const useServicios = () => {
  const context = useContext(ServicioContext);
  if (context === undefined) {
    throw new Error(
      "useServicios must be used within a ServicioContextProvider"
    );
  }
  return context;
};

export const ServicioContextProvider = ({ children }) => {
  const [serviciosAll, setServiciosAll] = useState([]);

  async function loadServiciosAll() {
    try {
      const response = await getServiciosRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de servicios");
      }
      setServiciosAll(response);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteServicio = async (id) => {
    try {
      const response = await deleteServicioRequest(id);
      setServiciosAll(serviciosAll.filter((servicio) => servicio.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createServicio = async (servicio) => {
    try {
      const response = await createServicioRequest(servicio);

      if (response.status === 201) {
        loadServiciosAll();
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateServicio = async (id, servicio) => {
    try {
      const response = await updateServicioRequest(id, servicio);

      if (response.status == 200) {
        loadServiciosAll();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createImagenesServicioEnbd = async (id_servicio, imagenes) => {
    try {
      const response = await createImagenesRequest(
        id_servicio,
        imagenes
      );

      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
  /*
  const getImagenPortadaPorIdPublicacion = async (id_publicacionBlog) => {
    try {
      const response = await getImagenPortadaPorIdPublicacionRequest(
        id_publicacionBlog
      );

      if (response.status === 200 && response.data) {
        return response.data.url;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
*/

  return (
    <ServicioContext.Provider
      value={{
        serviciosAll,
        loadServiciosAll,
        deleteServicio,
        createServicio,
        updateServicio,

        createImagenesServicioEnbd,
      }}
    >
      {children}
    </ServicioContext.Provider>
  );
};
