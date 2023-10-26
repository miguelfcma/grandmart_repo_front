import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una imagen de servicio
export const createServicioImageRequest = async (url, id_servicio) => {
  try {
    const response = await axios.post(API_BASE_URL + "servicio-images", { url, id_servicio });
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// Función para crear múltiples imágenes de servicio
export const createImagenesRequest = async (id_servicio, imagenes) => {
  try {
    const response = await axios.post(API_BASE_URL + "servicio-imagenes/multiple", { id_servicio, imagenes });
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// Función para eliminar una imagen de servicio por su ID
export const deleteImgServicioRequest = async (id) => {
  try {
    const response = await axios.delete(API_BASE_URL + `servicio-imagenes/${id}`);
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// Función para obtener imágenes de servicio por ID de servicio
export const getImagenesPorIdServicioRequest = async (id_servicio) => {
  try {
    const response = await axios.get(API_BASE_URL + `servicio-imagenes/${id_servicio}`);
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// Función para obtener la imagen de portada de un servicio por su ID de servicio
export const getServicioImagePortadaRequest = async (id_servicio) => {
  try {
    const response = await axios.get(API_BASE_URL + `servicio-imagenes/portada/${id_servicio}`);
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// Función para actualizar una imagen de servicio por su ID
export const updateImgServicioRequest = async (id, url, id_servicio, es_portada) => {
  try {
    const response = await axios.put(API_BASE_URL + `servicio-imagenes/${id}`, { url, id_servicio, es_portada });
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// Función para obtener todas las imágenes de servicio disponibles por ID de servicio
export const getAllImagesServicioRequest = async (id_servicio) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicio-images/todas/${id_servicio}`);
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
