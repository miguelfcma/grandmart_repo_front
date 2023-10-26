import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una reseña de servicio
const createReview = async (reviewData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}servicio-review`,
      reviewData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

// Función para eliminar una reseña por su ID
const deleteReviewById = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}servicio-review/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

// Función para obtener reseñas por el ID del servicio
const getReviewsByServiceId = async (id_servicio) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}servicio-review/service/${id_servicio}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

// Función para actualizar una reseña por su ID
const updateReviewById = async (id, reviewData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}servicio-review/${id}`,
      reviewData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

// Función para obtener el promedio de calificación por el ID del servicio
const getAvgRatingByServiceId = async (id_servicio) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}servicio-review/service/${id_servicio}/avg-rating`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};
