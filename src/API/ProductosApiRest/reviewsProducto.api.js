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
    return response.data;
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
    return response.data;
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
