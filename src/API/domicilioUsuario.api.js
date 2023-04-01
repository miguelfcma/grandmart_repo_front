import axios from "axios";
import { API_BASE_URL } from "./config.api";


export const createDomicilioUsuarioRequest = async (domicilioUsuario) => {
  try {
    const response = await axios.post(API_BASE_URL + "domicilio-usuario", domicilioUsuario);
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

export const getDomicilioUsuarioByUserIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(API_BASE_URL + `domicilio-usuario/${id_usuario}`);
    console.log({
      status: response.status,
      message: response.data.message,
      data: response.data
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

export const updateDomicilioUsuarioByUserIdRequest = async (id_usuario, domicilioUsuario) => {
  try {
    const response = await axios.put(API_BASE_URL + `domicilio-usuario/${id_usuario}`, domicilioUsuario);
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

export const deleteDomicilioUsuarioByUserIdRequest = async (id_usuario) => {
  try {
    const response = await axios.delete(API_BASE_URL + `domicilio-usuario/${id_usuario}`);
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
