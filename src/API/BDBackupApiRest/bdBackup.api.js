import axios from "axios";
import { API_BASE_URL } from "../config.api";
const token = localStorage.getItem("token");

export const getBackupRequest = async (credentials) => {
  try {
    const response = await axios.post(API_BASE_URL + "backup-bd", credentials, {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token JWT en la cabecera Authorization
      },
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
export const postRestoreRequest = async (filename, credentials) => {
  try {
    console.log(credentials);
    const response = await axios.post(
      API_BASE_URL + `restore-bd/${filename}`,
      credentials,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Envía el token JWT en la cabecera Authorization
        },
      }
    );
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const getListaDeBackupsRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "restore-bd", {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token JWT en la cabecera Authorization
      },
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

export const deleteBackupRequest = async (filename, credentials) => {
  try {
    const response = await axios.post(
      API_BASE_URL + `restore-bd/delete/${filename}`,
      credentials,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Envía el token JWT en la cabecera Authorization
        },
      }
    );
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
// función para descargar un archivo
export const downloadFile = async (filename, credentials) => {
  try {
    console.log(filename);
    const response = await axios.post(
      API_BASE_URL + `restore-bd/download/${filename}`,
      credentials,
      {
        responseType: "blob", // indicamos que esperamos una respuesta tipo Blob
        headers: {
          Authorization: `Bearer ${token}`, // Envía el token JWT en la cabecera Authorization
        },
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data])); // creamos una URL para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // establecemos el nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
  }
};
