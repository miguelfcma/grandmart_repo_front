import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const getBackupRequest = async (credentials) => {
  try {
    const response = await axios.post(API_BASE_URL + "backup-bd", credentials, {
      headers: {
        Authorization: `Bearer ${credentials.token}`, // Envía el token JWT en la cabecera Authorization
      },
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], { type: "application/sql" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "backup.sql";
    document.body.appendChild(link);
    link.click();
    return response;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};
export const postRestoreRequest = async (credentials, archivo) => {
  try {
    const formData = new FormData();
    formData.append("archivo", archivo);

    const response = await axios.post(API_BASE_URL + "restore-bd", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${credentials.token}`,
      },
      params: {
        email: credentials.email,
        password: credentials.password,
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
