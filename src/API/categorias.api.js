import axios from "axios";

const API_BASE_URL = "http://localhost:4000/categorias";

export const getCategoriasRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log(response.data)
    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
