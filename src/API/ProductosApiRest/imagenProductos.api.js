import axios from "axios";
import { API_BASE_URL } from "../config.api";

// Función para crear una imagen de producto
export const createProductImageRequest = async (productImage) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "product-images",
      productImage
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

// Función para crear imágenes de producto en lote
export const createImagenesRequest = async (id_producto, imagenes) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "producto-imagenes/multiple",
      { id_producto, imagenes }
    );

    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// Función para obtener la imagen de portada de un producto
export const getProductImagePortadaRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL + "product-images/portada"}/${id_producto}`
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

// Función para obtener las imágenes de galería de un producto
export const getProductImagesGaleriaRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}product-images/galeria/${id_producto}`
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

// Función para obtener todas las imágenes de un producto
export const getAllImagesProductRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}product-images/todas/${id_producto}`
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
