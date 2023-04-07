import axios from "axios";
import { API_BASE_URL } from "../config.api";


export const createProductImageRequest = async (productImage) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "product-images",
      productImage
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



export const getProductImagePortadaRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL + "product-images/portada"}/${id_producto}`
    );
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

export const getProductImagesGaleriaRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}product-images/galeria/${id_producto}`
    );
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

export const getAllImagesProductRequest = async (id_producto) => {
  try {
    const response = await axios.get(

        `${API_BASE_URL}product-images/todas/${id_producto}`
   
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