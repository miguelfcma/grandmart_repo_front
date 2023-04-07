import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const createComentario = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/blog-comentarios`, data);
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

export const getComentariosPorIdPublicacion = async (idPublicacion) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog-comentarios/${idPublicacion}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const deleteComentarioPorIdUsuario = async (idUsuario) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/blog-comentarios/${idUsuario}`);
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

export const updateComentarioPorIdUsuario = async (idUsuario, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/blog-comentarios/${idUsuario}`, data);
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
