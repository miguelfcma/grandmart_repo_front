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

// Función para obtener todas las ordenes 
export const obtenerTodasLasOrdenesConDetallesRequest = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}ordenes-all`);
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
export const actualizarEstadoOrdenRequest = async (id_orden, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}ordenes/${id_orden}`, data);
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
export const obtenerDetalleOrdenRequest = async (id_orden) => {
  try {
    const response = await axios.get(`${API_BASE_URL}ordenes/detalles/${id_orden}`);
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

// Función p
export const obtenerDireccionEnvioOrdenRequest = async (id_orden) => {
  try {
    const response = await axios.get(`${API_BASE_URL}ordenes/direccion/${id_orden}`);
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
