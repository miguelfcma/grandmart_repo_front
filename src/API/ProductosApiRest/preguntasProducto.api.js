import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una pregunta de producto
export const crearPreguntaProductoRequest = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}producto-preguntas`,
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

// Función para crear una respuesta a una pregunta de producto
export const crearRespuestaProductoRequest = async (id_pregunta, data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}producto-preguntas/${id_pregunta}/respuesta`,
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

// Función para obtener preguntas por ID de producto
export const getPreguntasByIdProductoRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-preguntas/producto/${id_producto}`
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

// Función para eliminar una pregunta de producto por ID de pregunta
export const eliminarPreguntaProductoRequest = async (idPregunta) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}producto-preguntas/${idPregunta}`
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

// Función para actualizar una pregunta de producto por ID de pregunta
export const actualizarPreguntaProductoRequest = async (idPregunta, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}producto-preguntas/${idPregunta}`,
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

// Función para obtener productos con preguntas por ID de usuario
export const getProductosConPreguntasByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-preguntas/productos-preguntas/${id_usuario}`
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
