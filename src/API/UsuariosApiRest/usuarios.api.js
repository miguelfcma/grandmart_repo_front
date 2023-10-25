import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para obtener la lista de usuarios
export const getUsuariosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "usuarios");
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

/* Recibe usuario */

// Función para realizar un inicio de sesión de usuario
export const getUsuarioLoginRequest = async (usuario) => {
  try {
    const response = await axios.post(API_BASE_URL + "usuarios/login", usuario);
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

// Función para crear un nuevo usuario
export const createUsuarioRequest = async (usuario) => {
  try {
    const response = await axios.post(API_BASE_URL + "usuarios", usuario);
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

// Función para actualizar la información de un usuario
export const updateUsuarioRequest = async (id, usuario) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL + "usuarios"}/${id}`,
      usuario
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

// Función para eliminar un usuario
export const deleteUsuarioRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL + "usuarios"}/${id}`);
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

////

// Función para obtener información de perfil de un usuario
export const obtenerInfoPerfilRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `usuario-perfil/${id_usuario}`
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

// Función para actualizar el perfil de un usuario
export const actualizarPerfilUsuarioRequest = async (id_usuario, data) => {
  try {
    const response = await axios.put(
      API_BASE_URL + `usuario-perfil/${id_usuario}`,
      data
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
    throw error.response.data;
  }
};

// Función para actualizar la contraseña de un usuario
export const actualizarContrasenaUsuarioRequest = async (id_usuario, data) => {
  console.log(data);
  try {
    const response = await axios.put(
      API_BASE_URL + `contrasena-usuario-actualizar/${id_usuario}`,
      data
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

//////////////

// Función para crear una cuenta bancaria
export const createCuentaBancariaRequest = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL + "cuenta-bancaria", data);
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

// Función para obtener la información de una cuenta bancaria por el ID del usuario
export const getCuentaBancariaByUserIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `cuenta-bancaria/${id_usuario}`
    );
    console.log({
      status: response.status,
      message: response.data.message,
      data: response.data,
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

// Función para actualizar la información de una cuenta bancaria por el ID del usuario
export const updateCuentaBancariaByUserIdRequest = async (id_usuario, data) => {
  try {
    const response = await axios.put(
      API_BASE_URL + `cuenta-bancaria/${id_usuario}`,
      data
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

// Función para eliminar una cuenta bancaria por el ID del usuario
export const deleteCuentaBancariaByUserIdRequest = async (id_usuario) => {
  try {
    const response = await axios.delete(
      API_BASE_URL + `cuenta-bancaria/${id_usuario}`
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

// Función para eliminar la cuenta de un usuario
export const eliminarCuentaUsuarioRequest = async (id, password) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}usuarios/${id}/eliminar-cuenta`,
      { data: { password } }
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

// Función para obtener información de un panel de control
export const getInformacionDash = async (id_usuario) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `dashinformacion/${id_usuario}`
    );
    console.log({
      status: response.status,
      data: response.data,
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
