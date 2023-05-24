import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const createReviewRequest = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}producto-review/`, data);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const deleteReviewByIdRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}producto-review/${id}`);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const getReviewsByProductIdRequest = async (id_producto) => {
  try {
    const response = await axios.get(`${API_BASE_URL}producto-review/${id_producto}`);
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

export const updateReviewByIdRequest = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}producto-review/${id}`, data);
    console.log({
      status: response.status,
      message: response.data.message,
    });
    return response.data;
  } catch (error) {
    console.log({
      status: error.response.status,
      message: error.response.data.message,
    });
    return error.response;
  }
};

export const getAvgRatingByProductIdRequest = async (id_producto) => {
  try {
    const response = await axios.get(`${API_BASE_URL}producto-review/${id_producto}/avg-rating`);
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

export const getReviewByUserAndProductRequest = async (id_usuario, id_producto) => {
  try {
    const response = await axios.get(`${API_BASE_URL}producto-review/user/${id_usuario}/product/${id_producto}`);
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

// Obtener productos del usuario con reviews asociadas
export const getProductosConReviewsByUsuarioId = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Buscar productos del usuario por su ID de usuario
    const productos = await Producto.findAll({ where: { id_usuario } });

    if (productos.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos para el usuario especificado" });
    }

    const productosConReviews = await Promise.all(productos.map(async producto => {
      // Buscar reviews asociadas al producto
      const reviews = await ReviewProducto.findAll({ where: { id_producto: producto.id } });

      if (reviews.length > 0) {
        // Si el producto tiene reviews asociadas, agregarlas como propiedad al objeto de producto
        return { producto: producto.toJSON(), reviews };
      } else {
        // Si el producto no tiene reviews asociadas, devolver null
        return null;
      }
    }));

    // Filtrar los productos nulos (que no tienen reviews asociadas)
    const productosConReviewsFiltrados = productosConReviews.filter(producto => producto !== null);

    res.status(200).json(productosConReviewsFiltrados);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getProductosConReviewsByUsuarioIdRequest = async (id_usuario) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}productos-reviews/${id_usuario}`
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


export const getTodasLasreviewsRequest = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}productos-reviews-todas/`
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