import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para obtener todas las categorías
export const getCategoriasRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "categorias");
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

// Función para crear una nueva categoría
export const createCategoriaRequest = async (categoria) => {
  try {
    const response = await axios.post(API_BASE_URL + "categorias", categoria);
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

// Función para actualizar una categoría por su ID
export const updateCategoriaRequest = async (id, categoria) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL + "categorias"}/${id}`,
      categoria
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

// Función para eliminar una categoría por su ID
export const deleteCategoriaRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL + "categorias"}/${id}`);
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
