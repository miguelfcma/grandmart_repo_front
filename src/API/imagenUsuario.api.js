import axios from "axios";
import { API_BASE_URL} from "./config.api";
//const API_BASE_URL = "http://localhost:4000/imagenes";

export const getImagenesRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"imagenes");
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


export const createImagenRequest = async (imagen) => {
  try {
    const formData = new FormData();

    //formData.append("nombre", imagen.nombre);
    //formData.append("descripcion", imagen.descripcion);
    formData.append("imagen", imagen.archivo);

    const response = await axios.post(API_BASE_URL+"imagenes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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


export const updateImagenRequest = async (id, imagen) => {
  try {
    const formData = new FormData();
    //formData.append("nombre", imagen.nombre);
    //formData.append("descripcion", imagen.descripcion);
    formData.append("archivo", imagen.archivo);
    const response = await axios.put(`${API_BASE_URL+"imagenes"}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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


export const deleteImagenRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL+"imagenes"}/${id}`);
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

