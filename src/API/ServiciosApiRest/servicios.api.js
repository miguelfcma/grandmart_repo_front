import axios from "axios";
import { API_BASE_URL} from "../config.api";
//const API_BASE_URL= "http://localhost:4000/servicios";

// Función para obtener todos los servicios
export const getServiciosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "servicios");
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

// Función para crear un nuevo servicio
export const createServicioRequest = async (servicio) => {
  try {
    const response = await axios.post(API_BASE_URL + "servicios", servicio);
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

// Función para actualizar un servicio por su ID
export const updateServicioRequest = async (id, servicio) => {
  try {
    const response = await axios.put(`${API_BASE_URL + "servicios"}/${id}`, servicio);
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

// Función para eliminar un servicio por su ID
export const deleteServicioRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL + "servicios"}/${id}`);
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

// Función para obtener servicios por el ID de usuario
export const getServiciosByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicios/user/${id_usuario}`);
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para obtener un servicio por su ID
export const getServicioByIdRequest = async (id_servicio) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicios/${id_servicio}`);
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para crear datos de contacto para un servicio
export const createDatosContactoServicioRequest = async (datosContacto) => {
  try {
    const response = await axios.post(`${API_BASE_URL}servicios/datos-contacto`, datosContacto);
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

// Función para obtener datos de contacto de un servicio por su ID
export const obtenerDatosContactoServicioRequest = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicios/datos-contacto/${id}`);
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

// Función para actualizar datos de contacto de un servicio por su ID
export const actualizarDatosContactoServicioRequest = async (id, datosContacto) => {
  try {
    const response = await axios.put(`${API_BASE_URL}servicios/datos-contacto/${id}`, datosContacto);
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
