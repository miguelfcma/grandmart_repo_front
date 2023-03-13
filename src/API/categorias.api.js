import axios from "axios";

const API_BASE_URL = "http://localhost:4000/categorias";

export const getCategoriasRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
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


export const createCategoriaRequest = async (categoria) => {
  try {
    const response = await axios.post(API_BASE_URL, categoria);
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

export const updateCategoriaRequest = async (id, categoria) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, categoria);
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

export const deleteCategoriaRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
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
