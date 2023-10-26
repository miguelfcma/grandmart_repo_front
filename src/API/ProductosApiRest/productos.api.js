import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para obtener todos los productos
export const getProductosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"productos");

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para crear un nuevo producto
export const createProductoRequest = async (producto) => {
  console.log(producto)
  try {
    const response = await axios.post(API_BASE_URL+"productos", producto);

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para actualizar un producto por su ID
export const updateProductoRequest = async (id, producto) => {
  try {
    const response = await axios.put(`${API_BASE_URL+"productos"}/${id}`, producto);

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para eliminar un producto por su ID
export const deleteProductoRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL+"productos"}/${id}`);

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};


// Función para obtener productos por el ID de usuario
export const getProductosByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}productos/user/${id_usuario}`);

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

// Función para obtener un producto por su ID
export const getProductoByIdRequest = async (id_producto) => {
  try {
    const response = await axios.get(`${API_BASE_URL}productos/${id_producto}`);

    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};