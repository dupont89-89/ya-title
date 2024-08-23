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

export const getTitleGpt = (text) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`gpt/title?text=${text}`);
      debugger;
      return response.data;
    } catch (error) {
      console.error("Ошибка запроса Тайтла от GPT:", error);
    }
  };
};
