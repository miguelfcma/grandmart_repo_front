import axios from "axios";
import { API_BASE_URL } from "./config.api";
/*RUTAS
// Rutas disponibles:
// Obtiene todos los usuarios
router.get("/usuarios", getUsuarios);

// Obtiene un usuario por su ID
router.get("/usuarios/:id", getUsuario);

// Crea un nuevo usuario
router.post("/usuarios", createUsuario);

// Actualiza un usuario existente por su ID
router.put("/usuarios/:id", updateUsuario);

// Borra un usuario existente por su ID
router.delete("/usuarios/:id", deleteUsuario);

// Ruta para que un usuario inicie sesión
router.post("/usuarios/login", getUsuarioLogin);
 */
export const getUsuariosRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"usuarios");
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
export const getUsuarioLoginRequest = async (usuario) => {
  try {
    const response = await axios.post(API_BASE_URL+"usuarios/login", usuario);
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

export const createUsuarioRequest = async (usuario) => {
  try {
    const response = await axios.post(API_BASE_URL+"usuarios", usuario);
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

export const updateUsuarioRequest = async (id, usuario) => {
  try {
    const response = await axios.put(`${API_BASE_URL+"usuarios"}/${id}`, usuario);
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

export const deleteUsuarioRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL+"usuarios"}/${id}`);
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
