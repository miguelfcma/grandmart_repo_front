import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear un comentario en un blog
export const createComentarioRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}blog-comentarios`, data);
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

// Función para obtener comentarios por ID de publicación en el blog
export const getComentariosPorIdPublicacionRequest = async (
  id_publicacionBlog
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}blog-comentarios/${id_publicacionBlog}`
    );
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

// Función para eliminar un comentario por ID de usuario y comentario
export const deleteComentarioPorIdUsuarioRequest = async (idUsuario, id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}blog-comentarios/${idUsuario}/${id}`
    );
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

// Función para actualizar un comentario por ID de usuario
export const updateComentarioPorIdUsuarioRequest = async (idUsuario, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}blog-comentarios/${idUsuario}`,
      data
    );
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
