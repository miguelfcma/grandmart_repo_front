import axios from "axios";
import { API_BASE_URL } from "../config.api";

export const createReview = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/producto-review/`, data);
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

export const deleteReviewById = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/producto-review/${id}`);
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

export const getReviewsByProductId = async (id_producto) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/producto-review/${id_producto}`);
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

export const updateReviewById = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/producto-review/${id}`, data);
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

export const getAvgRatingByProductId = async (id_producto) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/producto-review/${id_producto}/avg-rating`);
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
