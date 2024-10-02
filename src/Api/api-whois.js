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

export const fetchApiWhois = (domen) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/tools/whois?domen=${domen}`);
      debugger;
      return response.data;
    } catch (error) {
      console.error("Ошибка запроса домена Whois на фронтенде:", error);
    }
  };
};
