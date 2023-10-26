import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una denuncia de producto
export const crearDenunciaProductoRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}buzon-denuncias`, data);
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

// Función para obtener denuncias por ID de producto
export const getDenunciasByIdProductoRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-denuncias/producto/${id_producto}`
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

// Función para eliminar una denuncia de producto por ID de denuncia
export const eliminarDenunciaProductoRequest = async (idDenuncia) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}producto-denuncias/eliminar/${idDenuncia}`
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

// Función para obtener productos con denuncias por ID de usuario
export const getProductosConDenunciasByUsuarioIdRequest = async (
  id_usuario
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-denuncias/productos-denuncias/${id_usuario}`
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

// Función para obtener todas las denuncias de productos
export const getTodasLasDenunciasRequest = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-denuncias-todas/`
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

// Función para marcar una denuncia como revisada por ID de denuncia
export const actualizarDenunciaARevisada = async (id_denuncia) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}producto-denuncias/actualizar/${id_denuncia}`
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
