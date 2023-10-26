import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una denuncia de servicio
export const crearDenunciaServicioRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}buzon-denuncias/servicio`, data);
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

// Función para obtener denuncias de servicio por ID de servicio
export const getDenunciasByIdServicioRequest = async (id_servicio) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicio-denuncias/servicio/${id_servicio}`);
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

// Función para eliminar una denuncia de servicio por su ID
export const eliminarDenunciaServicioRequest = async (idDenuncia) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}servicio-denuncias/eliminar/${idDenuncia}`);
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

// Función para obtener servicios con denuncias por ID de usuario
export const getServiciosConDenunciasByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicio-denuncias/servicios-denuncias/${id_usuario}`);
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

// Función para obtener todas las denuncias de servicio disponibles
export const getTodasLasDenunciasRequestServicio = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}servicio-denuncias-todas/`);
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

// Función para marcar una denuncia de servicio como revisada
export const actualizarDenunciaARevisadaServicio = async (id_denuncia) => {
  try {
    const response = await axios.put(`${API_BASE_URL}servicio-denuncias/actualizar/${id_denuncia}`);
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
}
