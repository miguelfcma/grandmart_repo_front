import axios from "axios";
import { API_BASE_URL} from "./config.api";
//const API_BASE_URL= "http://localhost:4000/servicios";

export const recoveryPassRequest = async (email) => {
  try {
    console.log(email)
    const response = await axios.post(API_BASE_URL+"send-email", email);


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
