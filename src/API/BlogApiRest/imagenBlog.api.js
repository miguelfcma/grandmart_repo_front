import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una imagen en una publicación de blog
export const createImagenPublicacionBlogRequest = async (imagen) => {
  try {
    const response = await axios.post(API_BASE_URL + "blog-imagenes", imagen);
    return response;
  } catch (error) {
    console.log({
      error,
    });
    return error.response;
  }
};

// Función para actualizar una imagen por ID de publicación en el blog
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
      error,
    });
    return error.response;
  }
};

// Función para eliminar una imagen por ID de publicación en el blog
export const deleteImagenPorIdPublicacionRequest = async (
  id_publicacionBlog
) => {
  try {
    const response = await axios.delete(
      API_BASE_URL + `blog-imagenes/${id_publicacionBlog}`
    );
    return response;
  } catch (error) {
    console.log({
      error,
    });
    return error.response;
  }
};

// Función para obtener imágenes por ID de publicación en el blog
export const getImagenesPorIdPublicacionRequest = async (
  id_publicacionBlog
) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `blog-imagenes/${id_publicacionBlog}`
    );
    return response;
  } catch (error) {
    console.log({
      error,
    });
    return error.response;
  }
};

// Función para obtener la imagen de portada por ID de publicación en el blog
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
      error,
    });
    return error.response;
  }
};

// Función para crear múltiples imágenes en una publicación de blog
export const createImagenesPublicacionBlogRequest = async (
  id_publicacionBlog,
  imagenes
) => {
  try {
    const response = await axios.post(API_BASE_URL + "blog-imagenes/multiple", {
      id_publicacionBlog,
      imagenes,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};
