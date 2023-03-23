import axios from "axios";
import { API_BASE_URL } from "./config.api";

export const getBackupRequest = async (credentials) => {
  try {
    const response = await axios.post(API_BASE_URL + "backup", credentials, {
      headers: {
        Authorization: `Bearer ${credentials.token}` // Envía el token JWT en la cabecera Authorization
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