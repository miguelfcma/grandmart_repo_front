import axios from "axios";
import { API_BASE_URL} from "../config.api";


export const createImgServicioRequest = async (url, id_servicio) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "servicio-imagenes",
        { url, id_servicio }
      );
      return response;
    } catch (error) {
      console.log({ error });
      return error.response;
    }
  };
  
  export const createImagenesRequest = async (id_servicio, imagenes) => {
   
    try {
      const response = await axios.post(
        API_BASE_URL + "servicio-imagenes/multiple",
        { id_servicio, imagenes }
      );
   
      return response;

    } catch (error) {
      console.log({ error });
      return error.response;
    }
  };
  

  export const deleteImgServicioRequest = async (id) => {
    try {
      const response = await axios.delete(API_BASE_URL + `servicio-imagenes/${id}`);
      return response;
    } catch (error) {
      console.log({ error });
      return error.response;
    }
  };
  
  export const getImagenesPorIdServicioRequest = async (id_servicio) => {
    try {
      const response = await axios.get(API_BASE_URL + `servicio-imagenes/${id_servicio}`);
      return response;
    } catch (error) {
      console.log({ error });
      return error.response;
    }
  };

  export const getPortadaRequest = async (id_servicio) => {
    try {
      const response = await axios.get(API_BASE_URL + `servicio-imagenes/portada/${id_servicio}`);
      return response;
    } catch (error) {
      console.log({ error });
      return error.response;
    }
  };

  export const updateImgServicioRequest = async (id, url, id_servicio, es_portada) => {
    try {
      const response = await axios.put(
        API_BASE_URL + `servicio-imagenes/${id}`,
        { url, id_servicio, es_portada }
      );
      return response;
    } catch (error) {
      console.log({ error });
      return error.response;
    }
  };
  
  
  