import axios from "axios";
import { setDataUser } from "../redux/user-reducer/user-reducer";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api`,
});

export const signUpUser = async (userData) => {
  try {
    const response = await instance.post("user/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error; // Перебросить ошибку для дальнейшей обработки
  }
};

export const loginUser = async (data) => {
  try {
    const response = await instance.post("user/auth", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/user/get-user?userId=${userId}`);
      const userData = response.data.userData;
      // Dispatch the setDataUser action to update the user data in the Redux store
      dispatch(setDataUser(userData));
      debugger;
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};