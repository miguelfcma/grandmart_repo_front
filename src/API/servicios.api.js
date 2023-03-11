import axios from "axios";

const API_BASE_URL = "http://localhost:4000/servicios";

export const getServiciosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createServicioRequest = async (servicio) => {
    try {
      const response = await axios.post(API_BASE_URL, servicio);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

export const updateServicioRequest = async (id, servicio) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, servicio);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteServicioRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
