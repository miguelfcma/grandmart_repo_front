import { useContext, useState, useEffect } from "react";

import {
  getServiciosRequest,
  createServicioRequest,
  deleteServicioRequest,
  updateServicioRequest,
} from "../../../API/servicios.api";

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
  const [servicios, setServicios] = useState([]);

  async function loadServicios() {
    try {
      const response = await getServiciosRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de servicios");
      }
      setServicios(response);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteServicio = async (id) => {
    try {
      const response = await deleteServicioRequest(id);
      setServicios(servicios.filter((servicio) => servicio.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createServicio = async (servicio) => {
    try {
      const response = await createServicioRequest(servicio);

      if (response.status == 201) {
        await refreshServicios(); // Llama a la función refreshServicios después de actualizar el servicio.
        return true;
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
      console.log(response);
      if (response.status == 200) {
        await refreshServicios(); // Llama a la función refreshServicios después de actualizar el servicio.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshServicios = async () => {
    // Agrega la función refreshServicios.
    try {
      const response = await getServiciosRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de servicios");
      }
      setServicios(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ServicioContext.Provider
      value={{
        servicios,
        loadServicios,
        deleteServicio,
        createServicio,
        updateServicio,
      }}
    >
      {children}
    </ServicioContext.Provider>
  );
};
