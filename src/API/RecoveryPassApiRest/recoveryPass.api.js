//Este archivo es para la API de recuperacion de contraseña

import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Definición de la función "recoveryPassRequest" que realiza una solicitud HTTP
export const recoveryPassRequest = async (email) => {
  try {
    // Imprime el parámetro "email" en la consola
    console.log(email);

    // Realiza una solicitud HTTP POST a la URL construida con "API_BASE_URL" y "send-email"
    const response = await axios.post(API_BASE_URL + "send-email", email);

    // Imprime el estado de la respuesta y el mensaje en la consola
    console.log({
      status: response.status,
      message: response.data.message,
    });

    // Retorna la respuesta
    return response;
  } catch (error) {
    // Captura y maneja errores en caso de que la solicitud falle
    // Imprime el estado del error y el mensaje de error en la consola
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });

    // Retorna el objeto de respuesta de error
    return error.response;
  }
};
