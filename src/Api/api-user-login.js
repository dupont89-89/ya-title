import axios from "axios";
import {
  setAuthSuccess,
  setDataUser,
} from "../redux/user-reducer/user-reducer";

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

export const sendEmailReset = async (email) => {
  try {
    const response = await instance.post("user/reset-password", { email });
    return response;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error; // Перебросить ошибку для дальнейшей обработки
  }
};

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/user/get-user?userId=${userId}`);
      const userData = response.data.userData;
      // Dispatch the setDataUser action to update the user data in the Redux store
      dispatch(setDataUser(userData));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await instance.post("user/auth", data);
      const userId = response.data.data.user.userId;
      dispatch(getUser(userId));
      dispatch(setAuthSuccess());
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const authUserVk = async (code, device_id) => {
  try {
    const response = await instance.get(
      `user/auth/vk?code=${code}&device_id=${device_id}`
    );
    debugger;
    return response.data;
  } catch (error) {
    console.error("Ошибка получения данных (code vk):", error);
    throw error;
  }
};
