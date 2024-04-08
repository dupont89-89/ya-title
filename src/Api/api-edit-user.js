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

export const loadAvatarUser = (formData, userId) => {
  return async (dispatch) => {
    debugger;
    try {
      const response = await instance.post(`/user/load-avatar`, formData, {
        params: {
          userId: userId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getUser(userId));
      return response.data;
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
      throw error;
    }
  };
};
