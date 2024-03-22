import axios from "axios";

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
