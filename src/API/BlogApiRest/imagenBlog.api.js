
import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const createImagenPublicacionBlogRequest = async (imagen) => {
  try {
    const response = await axios.post(API_BASE_URL + "blog-imagenes", imagen);
    return response;
  } catch (error) {
    console.log({
      error
    });
    return error.response;
  }
};

export const updateImagenPorIdPublicacionRequest = async (
    id_publicacionBlog,
  imagen
) => {
  try {
    const response = await axios.put(
      API_BASE_URL + `blog-imagenes/${id_publicacionBlog}`,
      imagen
    );
    return response;
  } catch (error) {
    console.log({
      error
    });
    return error.response;
  }
};
export const deleteImagenPorIdPublicacionRequest = async (id_publicacionBlog) => {
  try {
    const response = await axios.delete(
      API_BASE_URL + `blog-imagenes/${id_publicacionBlog}`
    );
    return response;
  } catch (error) {
    console.log({
      error
    });
    return error.response;
  }
};
export const getImagenesPorIdPublicacionRequest = async (id_publicacionBlog) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `blog-imagenes/${id_publicacionBlog}`
    );
    return response;
  } catch (error) {
    console.log({
      error
    });
    return error.response;
  }
};
export const getImagenPortadaPorIdPublicacionRequest = async (
    id_publicacionBlog
) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `blog-imagenes/portada/${id_publicacionBlog}`
    );
    return response;
  } catch (error) {
    console.log({
      error
    });
    return error.response;
  }
};
export const createImagenesPublicacionBlogRequest = async (id_publicacionBlog, imagenes) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "blog-imagenes/multiple",
      { id_publicacionBlog, imagenes }
    );
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};
