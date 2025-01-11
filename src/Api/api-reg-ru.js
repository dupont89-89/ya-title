import axios from "axios";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api/reg-ru`,
});

export const getDomenChekRegRu = (dataDomen) => {
  return async (dispatch) => {
    try {
      const response = await instance.post(`/chek-domen`, dataDomen);
      debugger;
      return response.data.results;
    } catch (error) {
      console.error(
        "Ошибка отправки доменов проверки доступности регистрации!:",
        error
      );
      throw error;
    }
  };
};
