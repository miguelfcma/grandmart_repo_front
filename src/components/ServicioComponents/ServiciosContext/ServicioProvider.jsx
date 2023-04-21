import { useContext, useState, useEffect } from "react";

import {
  getServiciosRequest,
  createServicioRequest,
  deleteServicioRequest,
  updateServicioRequest,
  getServiciosByUsuarioIdRequest
} from "../../../API/ServiciosApiRest/servicios.api";

import { 
  createServicioImageRequest,
  createImagenesRequest,
  getServicioImagePortadaRequest,
  getAllImagesServicioRequest,
} from "../../../API/ServiciosApiRest/imagenServicio.api";

/* 
import {
  crearPreguntaProductoRequest,
  getPreguntasByIdProductoRequest,
} from "../../../API/ProductosApiRest/preguntasProducto.api";
*/

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
  const [serviciosUsuario, setServiciosUsuario] = useState([]);

  async function loadServicios() {
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

  const createServicio = async (servicio) => {
    try {
      const response = await createServicioRequest(servicio);

      if (response.status === 201) {
        loadServicios();
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
        loadServicios();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteServicio = async (id) => {
    try {
      const response = await deleteServicioRequest(id);
      if (response.status == 200) {
      setServiciosAll(serviciosAll.filter((servicio) => servicio.id !== id));
    }}catch (error) {
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

  async function loadServicios() {
    try {
      const response = await getServiciosRequest();

      if (response.status === 200) {
        setServiciosAll(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de servicios");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const loadServiciosUsuario = async (id_usuario) => {
    try {
      const response = await getServiciosByUsuarioIdRequest(id_usuario);

      if (response.status === 200) {
        setServiciosUsuario(response.data);
      } else if (response.status === 404) {
        console.log("La lista de servicios no existe");
        setServiciosUsuario([]);
      } else {
        throw new Error("No se pudo obtener la lista de servicios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createServicioImage = async (imgServicio) => {
    try {
      const response = await createServicioImageRequest(imgServicio);

      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getImgPortadaServicio = async (id_servicio) => {
    const response = await getServicioImagePortadaRequest(id_servicio);
    if (response.status == 200) {
      return response.data.url;
    } else {
      return null;
    }
  };

  const getAllImagesServicio = async (id_servicio) => {
    const response = await getAllImagesServicioRequest(id_servicio);
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  };


  return (
    <ServicioContext.Provider
      value={{
        serviciosAll,
        serviciosUsuario,
        loadServicios,
        loadServiciosUsuario,
        deleteServicio,
        createServicio,
        updateServicio,
        createServicioImage,
        createImagenesServicioEnbd,
        getImgPortadaServicio,
        getAllImagesServicio,
      }}
    >
      {children}
    </ServicioContext.Provider>
  );
};
