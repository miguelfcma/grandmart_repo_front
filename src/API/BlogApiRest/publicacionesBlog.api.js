import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una nueva publicación
export const createPublicacionRequest = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}blog-publicaciones`,
      data
    );

    return response;
  } catch (error) {
    console.log(error);

    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });

    return error.response;
  }
};

// Función para eliminar una publicación por ID de usuario y ID de publicación en el blog
export const deletePublicacionPorIdUsuarioRequest = async (
  id_usuario,
  id_publicacionBlog
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}blog-publicaciones/eliminar/${id_usuario}`,
      { id: id_publicacionBlog }
    );

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para actualizar una publicación por ID de usuario
export const updatePublicacionPorIdUsuarioRequest = async (idUsuario, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}blog-publicaciones/${idUsuario}`,
      data
    );

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });

    return error.response;
  }
};

// Función para obtener todas las publicaciones
export const getPublicacionesRequest = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}blog-publicaciones`);

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });

    return error.response;
  }
};

// Función para obtener las publicaciones por ID de usuario
export const getPublicacionesPorIdUsuarioRequest = async (idUsuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}blog-publicaciones/${idUsuario}`
    );

    return response.data;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });

    return error.response;
  }
};
