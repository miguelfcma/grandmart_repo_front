import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una nueva pregunta para un servicio
export const crearPregunta = async (pregunta) => {
  try {
    const response = await axios.post(`${API_BASE_URL}servicio-preguntas`, pregunta);
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

// Función para crear una nueva respuesta para una pregunta de un servicio
export const crearRespuesta = async (idPregunta, respuesta) => {
  try {
    const response = await axios.post(`${API_BASE_URL}servicio-preguntas/${idPregunta}/respuesta`, respuesta);
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

// Función para obtener todas las preguntas asociadas a un servicio
export const getPreguntasByIdServicio = async (idServicio) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicio-preguntas/servicio/${idServicio}`);
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

// Función para eliminar una pregunta de un servicio por su ID
export const eliminarPregunta = async (idPregunta) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}servicio-preguntas/${idPregunta}`);
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

// Función para actualizar una pregunta de un servicio por su ID
export const actualizarPregunta = async (idPregunta, pregunta) => {
  try {
    const response = await axios.put(`${API_BASE_URL}servicio-preguntas/${idPregunta}`, pregunta);
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
