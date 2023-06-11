import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const crearDenunciaProductoRequest = async (data) => {
  try {

    const response = await axios.post(
      `${API_BASE_URL}buzon-denuncias`,
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

export const getDenunciasByIdProductoRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-denuncias/producto/${id_producto}`
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

export const eliminarDenunciaProductoRequest = async (idDenuncia) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}producto-denuncias/eliminar/${idDenuncia}`
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

export const getProductosConDenunciasByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-denuncias/productos-denuncias/${id_usuario}`
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

export const getTodasLasDenunciasRequest = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}producto-denuncias-todas/`
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

export const actualizarDenunciaARevisada = async (id_denuncia) => {
  try{
    const response = await axios.put(
      `${API_BASE_URL}producto-denuncias/actualizar/${id_denuncia}`
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
