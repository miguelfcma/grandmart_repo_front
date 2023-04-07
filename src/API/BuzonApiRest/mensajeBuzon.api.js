import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para obtener todos los mensajes
export const getAllMensajes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buzon-mensajes`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.mensajes;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para obtener un mensaje por su ID
export const getMensajeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buzon-mensajes/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.mensaje;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para crear un nuevo mensaje
export const createMensaje = async (mensaje) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/buzon-mensajes`, mensaje);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.mensaje;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para actualizar un mensaje por su ID
export const updateMensaje = async (id, mensaje) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/buzon-mensajes/${id}`, mensaje);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.mensaje;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para eliminar un mensaje por su ID
export const deleteMensaje = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/buzon-mensajes/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.mensaje;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para obtener todos los mensajes por el ID del usuario
export const getMensajesByUserId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buzon-mensajes/usuario/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.mensajes;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
