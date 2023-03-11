import axios from "axios";
const API_BASE_URL = "http://localhost:4000/imagenes";

export const getImagenesRequest = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createImagenRequest = async (imagen) => {
  try {
    const formData = new FormData();

    //formData.append("nombre", imagen.nombre);
    //formData.append("descripcion", imagen.descripcion);
    formData.append("imagen", imagen.archivo);

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateImagenRequest = async (id, imagen) => {
  try {
    const formData = new FormData();
    //formData.append("nombre", imagen.nombre);
    //formData.append("descripcion", imagen.descripcion);
    formData.append("archivo", imagen.archivo);
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteImagenRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
