import axios from "axios";
import { getUser } from "./api-user-login";
import { setBallDirect } from "../redux/tools-reducer/tools-reducer";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api`,
});

export const loadFileUserTools = (formData, userId, tools) => {
  return async (dispatch) => {
    try {
      const response = await instance.post(`/tools/upload-file`, formData, {
        params: {
          userId: userId,
          tools: tools,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getUser(userId));
      return response.data;
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      throw error;
    }
  };
};

export const getDirectBall = () => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/tools/get-direct-ball`);
      dispatch(setBallDirect(response.data.result));
      return response;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Ошибка запроса баллов:", error);
    }
  };
};

export const getCountWord = (query, region, userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.post(`/tools/count-word`, query, {
        params: {
          userId: userId,
          region: region,
        },
      });
      // dispatch(getUser(userId));
      return response.data.result;
    } catch (error) {
      console.error("Ошибка получения частотности запроса:", error);
      throw error;
    }
  };
};
