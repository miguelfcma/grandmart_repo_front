import axios from "axios";

const API_BASE_URL = "http://localhost:4000/servicios";

export const getServiciosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const createServicioRequest = async (servicio) => {
  try {
    const response = await axios.post(API_BASE_URL, servicio);
    return response;
  } catch (error) {
    console.error(error);
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const updateServicioRequest = async (id, servicio) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, servicio);
    return response;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const deleteServicioRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
