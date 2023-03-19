import axios from "axios";
import { API_BASE_URL} from "./config.api";
//const API_BASE_URL = "http://localhost:4000/categorias";

export const getCategoriasRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"categorias");
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
    const response = await axios.post(API_BASE_URL+"categorias", categoria);
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
    const response = await axios.put(`${API_BASE_URL+"categorias"}/${id}`, categoria);
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
    const response = await axios.delete(`${API_BASE_URL+"categorias"}/${id}`);
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
