import axios from "axios";

const API_BASE_URL = "http://localhost:4000/usuarios";

export const getUsuariosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
/* Recibe usuario */
export const getUsuarioLoginRequest = async (usuario) => {
  try {
    const response = await axios.post("http://localhost:4000/login", usuario);
    return response;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const createUsuarioRequest = async (usuario) => {
  try {
    const response = await axios.post(API_BASE_URL, usuario);
    return response;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const updateUsuarioRequest = async (id, usuario) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, usuario);
    return response;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const deleteUsuarioRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    //console.error(error);
    console.error(error.response.data.mensaje); // Aquí se imprime el mensaje de error
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
