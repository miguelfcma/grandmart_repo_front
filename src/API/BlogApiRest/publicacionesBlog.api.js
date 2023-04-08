import axios from "axios";
import { API_BASE_URL} from "../config.api";

export const createPublicacionRequest = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}blog-publicaciones`, data);
      console.log({
        status: response.status,
        message: response.data.message,
      });
      return response;
    } catch (error) {
      console.log(error)
      
      console.log({
        status: error.response.status,
        message: error.response.data.message,
      });
      
      return error.response;
    }
  };
  
  export const deletePublicacionPorIdUsuarioRequest = async (idUsuario) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}blog-publicaciones/${idUsuario}`);
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
  
  export const updatePublicacionPorIdUsuarioRequest = async (idUsuario, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}blog-publicaciones/${idUsuario}`, data);
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
  
  export const getPublicacionesRequest = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}blog-publicaciones`);
      console.log({
        status: response.status,
        message: response.data.message,
      });
      return response
    } catch (error) {
      console.log({
        status: error.response.status,
        message: error.response.data.message,
      });
      return error.response;
    }
  };
  
  export const getPublicacionesPorIdUsuarioRequest = async (idUsuario) => {
    try {
      const response = await axios.get(`${API_BASE_URL}blog-publicaciones/${idUsuario}`);
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