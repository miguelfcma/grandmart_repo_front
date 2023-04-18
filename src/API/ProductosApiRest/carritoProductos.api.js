import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para agregar producto al carrito
export const agregarProductoAlCarritoRequest = async (data) => {
  /**{
  "id_usuario": 77,
  "id_producto": 91
}
 */
  try {
    const response = await axios.post(`${API_BASE_URL}carrito`, data);
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

// Función para actualizar la cantidad de productos en el carrito
export const actualizarCantidadProductoEnCarritoRequest = async (
  id_producto,
  data
) => {
  /**{
  "id_usuario": 77,
  "accion": "decrementar"
} */
  try {
    const response = await axios.put(
      `${API_BASE_URL}carrito/${id_producto}`,
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

// Función para obtener el carrito de compras
export const obtenerCarritoDeComprasRequest = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_BASE_URL}carrito/${id_usuario}`);
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

// Función para eliminar un producto del carrito
export const eliminarProductoDelCarritoRequest = async (id_producto, data) => {
  /**
   * 
   * {
  "id_usuario": 77
}
   * 
   */
  console.log(data);
  try {
    const response = await axios.delete(
      `${API_BASE_URL}carrito/${id_producto}`,

      { params: data } // Pasar data como parámetros de la URL
    );
    satisfies;
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

// Función para vaciar el carrito de compras
export const vaciarCarritoRequest = async (id_usuario) => {
  /**
 {
  "id_usuario":"77"
}
   */
  try {
    const response = await axios.delete(
      `${API_BASE_URL}carrito/vaciar/${id_usuario}`
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
