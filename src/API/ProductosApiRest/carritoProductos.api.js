import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para agregar un producto al carrito de compras
export const agregarProductoAlCarritoRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}carrito`, data);
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

// Función para actualizar la cantidad de productos en el carrito
export const actualizarCantidadProductoEnCarritoRequest = async (
  id_producto,
  data
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}carrito/${id_producto}`,
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

// Función para obtener el contenido del carrito de compras
export const obtenerCarritoDeComprasRequest = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}carrito/${id_usuario}`);
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

// Función para eliminar un producto del carrito de compras
export const eliminarProductoDelCarritoRequest = async (id_producto, data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}carrito/eliminar-producto/${id_producto}`,
      data
    );
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

// Función para vaciar completamente el carrito de compras
export const vaciarCarritoRequest = async (id_usuario) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}carrito/vaciar/${id_usuario}`
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
