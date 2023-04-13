import axios from "axios";
import { API_BASE_URL } from "../config.api";

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

export const deletePublicacionPorIdUsuarioRequest = async (
  id_usuario,
  id_publicacionBlog
) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}blog-publicaciones/${id_usuario}?id=${id_publicacionBlog}`

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
