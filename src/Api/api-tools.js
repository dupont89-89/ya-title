import axios from "axios";
import { getUser } from "./api-user-login";

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
      debugger;
      dispatch(getUser(userId));
      return response.data;
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      throw error;
    }
  };
};
