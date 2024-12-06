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
      console.log("Response from server:", response); // Логируем полный ответ от сервера

      if (response && response.data && response.data.userData) {
        console.log("User data:", response.data.userData); // Логируем данные о пользователе
        dispatch(setDataUser(response.data.userData)); // Диспатчим данные в Redux
      } else {
        console.error("No user data found in response");
      }

      return response.data;
    } catch (error) {
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

export const authUserVk = async (userData) => {
  try {
    const response = await instance.post("user/auth/vk", userData);
    return response.data;
  } catch (error) {
    console.error("Error during sign up VK:", error);
    throw error; // Перебросить ошибку для дальнейшей обработки
  }
};
