import axios from "axios";

const API_BASE_URL = "http://localhost:4000/product-images";

export const createProductImageRequest = async (productImage) => {
  try {
    const response = await axios.post(API_BASE_URL, productImage);
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

export const getProductImageRequest = async (id_producto) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id_producto}`);
    console.log({
      status: response.status,
      message: "Imagen de producto recuperada correctamente",
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