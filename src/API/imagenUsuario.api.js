import axios from "axios";
import { API_BASE_URL } from "./config.api";

export const createImgUsuarioRequest = async (imgUsuario) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "usuario-images",
      imgUsuario
    );
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

export const getImgUsuarioByUserIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL + "usuario-images-by-user"}/${id_usuario}`
    );
    console.log({
      status: response.status,
      message: "Imagen de usuario recuperada correctamente",
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

export const deleteImgUsuarioByUserIdRequest = async (id_usuario) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL + "usuario-images-by-user"}/${id_usuario}`
    );
    console.log({
      status: response.status,
      message: "Imagen de usuario eliminada correctamente",
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

export const updateImgUsuarioByUserIdRequest = async (id_usuario, imgUsuario) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL + "usuario-images-by-user"}/${id_usuario}`,
      imgUsuario
    );
    console.log({
      status: response.status,
      message: "Imagen de usuario actualizada correctamente",
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
