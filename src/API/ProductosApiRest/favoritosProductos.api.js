import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para obtener los productos favoritos de un usuario
export const obtenerFavoritosRequest = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}favoritos/${id_usuario}`);
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
export const agregarProductoAFavoritosRequest = async (
  id_usuario,
  id_producto
) => {
  console.log("hola2", id_usuario, id_producto);
  try {
    const response = await axios.post(
      `${API_BASE_URL}favoritos/${id_usuario}`,
      { data: { id_producto: id_producto } }
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

// Función para eliminar un producto de los favoritos de un usuario
export const eliminarProductoFavoritoRequest = async (
  id_usuario,
  id_producto
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}favoritos-eliminar/${id_usuario}`,
      { data: { id_producto: id_producto } }
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
