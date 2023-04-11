import { useContext, useState, useEffect } from "react";

import {
  getServiciosRequest,
  createServicioRequest,
  deleteServicioRequest,
  updateServicioRequest,
} from "../../../API/ServiciosApiRest/servicios.api";

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
      setServicios(response);
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

      if (response.status == 201) {
        loadServiciosAll();
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
        loadServiciosAll();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <ServicioContext.Provider
      value={{
        serviciosAll,
        loadServiciosAll,
        deleteServicio,
        createServicio,
        updateServicio,
      }}
    >
      {children}
    </ServicioContext.Provider>
  );
};
