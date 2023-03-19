import axios from "axios";
import { API_BASE_URL } from "./config.api";

//const API_BASE_URL = "http://localhost:4000/product-images";
//Rutas en el back
/*

// Ruta para crear una nueva imagen de producto
router.post("/product-images", createImgProducto);

// Ruta para obtener la imagen de un producto por su ID
router.get("/product-images/:id", getImgProducto);

// Ruta para obtener la imagen de portada de un producto por su ID
router.get("/product-images/portada/:id", getPortada);

// Ruta para obtener todas las imágenes de un producto por su ID
router.get("/product-images/producto/:id", getImagenes);

// Ruta para eliminar una imagen de producto por su ID
router.delete("/product-images/:id", deleteImgProducto);

// Ruta para actualizar una imagen de producto por su ID
router.put("/product-images/:id", updateImgProducto);
*/
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

export const getProductImageRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL + "product-images/producto"}/${id_producto}`
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

export const getProductImagesRequest = async (id_producto) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}product-images/producto/${id_producto}`
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

        `${API_BASE_URL}product-images-all/producto/${id_producto}`
   
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
