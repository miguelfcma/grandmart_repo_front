import axios from "axios";
import { API_BASE_URL} from "../config.api";
//const API_BASE_URL= "http://localhost:4000/servicios";

export const getServiciosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"servicios");
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};


export const createServicioRequest = async (servicio) => {
  try {
    const response = await axios.post(API_BASE_URL+"servicios", servicio);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const updateServicioRequest = async (id, servicio) => {
  try {
    const response = await axios.put(`${API_BASE_URL+"servicios"}/${id}`, servicio);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};


export const deleteServicioRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL+"servicios"}/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
