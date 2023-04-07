import axios from "axios";
import { API_BASE_URL} from "../config.api";

export const createPublicacion = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/blog-publicaciones`, data);
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
  
  export const deletePublicacionPorIdUsuario = async (idUsuario) => {
    try {
      const response = await axios.delete(`${BASE_URL}/blog-publicaciones/${idUsuario}`);
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
  
  export const updatePublicacionPorIdUsuario = async (idUsuario, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/blog-publicaciones/${idUsuario}`, data);
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
  
  export const getPublicaciones = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-publicaciones`);
      console.log({
        status: response.status,
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      console.log({
        status: error.response.status,
        message: error.response.data.message,
      });
      return error.response;
    }
  };
  
  export const getPublicacionesPorIdUsuario = async (idUsuario) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-publicaciones/${idUsuario}`);
      console.log({
        status: response.status,
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      console.log({
        status: error.response.status,
        message: error.response.data.message,
      });
      return error.response;
    }
  };