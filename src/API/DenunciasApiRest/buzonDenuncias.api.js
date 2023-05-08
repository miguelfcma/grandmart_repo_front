import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para obtener todas las denuncias
export const getAllDenuncias = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buzon-denuncias`);
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

// Función para obtener denuncia por su ID
export const getDenunciaById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buzon-denuncias/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.denuncia;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para crear una nueva denuncia
export const createDenuncia = async (denuncia) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/buzon-denuncias`, denuncia);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.denuncia;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para eliminar una denuncia por su ID
export const deleteDenuncia = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/buzon-denuncias/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.denuncia;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para obtener todas las denuncias por el ID del usuario
export const getDenunciasByUserId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buzon-denuncias/usuario/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data.denuncias;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
