import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una nueva pregunta para un servicio
export const crearPreguntaServicioRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}servicio-preguntas`, data);
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

// Función para crear una nueva respuesta para una pregunta de un servicio
export const crearRespuestaServicioRequest = async (idPregunta, respuesta) => {
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
export const getPreguntasByIdServicioRequest = async (id_servicio) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicio-preguntas/servicio/${id_servicio}`);
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

// Función para eliminar una pregunta de un servicio por su ID
export const eliminarPreguntaServicioRequest = async (idPregunta) => {
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


export const getServiciosConPreguntasByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}servicio-preguntas/servicios-preguntas/${id_usuario}`
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
