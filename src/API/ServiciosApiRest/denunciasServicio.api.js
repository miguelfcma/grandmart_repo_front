import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const crearDenunciaServicioRequest = async (data) => {
  try {

    const response = await axios.post(
      `${API_BASE_URL}buzon-denuncias/servicio`,
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

export const getDenunciasByIdServicioRequest = async (id_servicio) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}servicio-denuncias/servicio/${id_servicio}`
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

export const eliminarDenunciaServicioRequest = async (idDenuncia) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}servicio-denuncias/eliminar/${idDenuncia}`
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

export const getServiciosConDenunciasByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}servicio-denuncias/servicios-denuncias/${id_usuario}`
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

export const getTodasLasDenunciasRequestServicio = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}servicio-denuncias-todas/`
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

export const actualizarDenunciaARevisadaServicio = async (id_denuncia, data) => {
  try{
    const response = await axios.put(
      `${API_BASE_URL}servicio-denuncias/actualizar/${id_denuncia}`,
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
}
