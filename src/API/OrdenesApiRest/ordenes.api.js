import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una nueva orden
export const crearOrdenRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}ordenes`, data);
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

// Función para obtener las órdenes de un usuario
export const obtenerOrdenesUsuarioRequest = async (idUsuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}ordenes/${idUsuario}`);
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

// Función para actualizar el estado de una orden
export const actualizarEstadoOrdenRequest = async (idOrden, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}ordenes/${idOrden}`, data);
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

// Función para obtener el detalle de una orden
export const obtenerDetalleOrdenRequest = async (idOrden) => {
  try {
    const response = await axios.get(`${API_BASE_URL}ordenes/detalles/${idOrden}`);
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
