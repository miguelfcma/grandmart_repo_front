import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una revisión de producto
export const createReviewRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}producto-review/`, data);
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

// Función para eliminar una revisión de producto por su ID
export const deleteReviewByIdRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}producto-review/${id}`);
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

// Función para obtener revisiones de producto por el ID del producto
export const getReviewsByProductIdRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-review/${id_producto}`
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

// Función para actualizar una revisión de producto por su ID
export const updateReviewByIdRequest = async (id, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}producto-review/${id}`,
      data
    );
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

// Función para obtener el promedio de calificación de un producto
export const getAvgRatingByProductIdRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-review/${id_producto}/avg-rating`
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

// Función para obtener una revisión de producto por el ID de usuario y el ID de producto
export const getReviewByUserAndProductRequest = async (
  id_usuario,
  id_producto
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-review/user/${id_usuario}/product/${id_producto}`
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

// Función para obtener productos del usuario con revisiones asociadas
export const getProductosConReviewsByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}productos-reviews/${id_usuario}`
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

// Función para obtener todas las revisiones
export const getTodasLasreviewsRequest = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}productos-reviews-todas/`);
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
