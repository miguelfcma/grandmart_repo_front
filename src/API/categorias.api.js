import axios from "axios";

const API_BASE_URL = "http://localhost:4000/categorias";

export const getCategoriasRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoriaRequest = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log( {status: error.response.status, message: error.response.data.message})
    console.error(error);
  }
};

export const createCategoriaRequest = async (categoria) => {
  try {
    const response = await axios.post(API_BASE_URL, categoria);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateCategoriaRequest = async (id, categoria) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, categoria);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategoriaRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    console.log( response.status)
    console.log( {status: response.status})
    return (response);
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log( {status: error.response.status, message: error.response.data.message})
    return (error.response.status);
  }
};
