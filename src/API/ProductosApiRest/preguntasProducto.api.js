import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const crearPreguntaProductoRequest = async (data) => {
  try {
    console.log("el bicho siuu", data);
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

export const crearRespuesta = async (idPregunta, data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}producto-preguntas/${idPregunta}/respuesta`,
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

export const getPreguntasByIdProductoRequest = async (idProducto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-preguntas/producto/${idProducto}`
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

export const eliminarPregunta = async (idPregunta) => {
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

export const actualizarPregunta = async (idPregunta, data) => {
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
