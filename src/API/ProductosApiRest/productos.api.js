import axios from "axios";
import { API_BASE_URL } from "../config.api";
//const API_BASE_URL = "http://localhost:4000/productos";

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