import axios from "axios";

const API_BASE_URL = "http://localhost:4000/productos";

export const getProductosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProductoRequest = async (producto) => {
    try {
      const response = await axios.post(API_BASE_URL, producto);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

export const updateProductoRequest = async (id, producto) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, producto);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductoRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
