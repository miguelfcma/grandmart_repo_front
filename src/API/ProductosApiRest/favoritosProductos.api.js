import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para obtener los productos favoritos de un usuario
export const obtenerFavoritosRequest = async (idUsuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}favoritos/${idUsuario}`);
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

// Función para agregar un producto a los favoritos de un usuario
export const agregarProductoAFavoritosRequest = async (idUsuario, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}favoritos/${idUsuario}`, data);
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

// Función para eliminar un producto de los favoritos de un usuario
export const eliminarProductoFavoritoRequest = async (idUsuario, idProducto) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}favoritos/${idUsuario}`, { data: { id_producto: idProducto } });
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
