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

export const getFetchkey = async (query) => {
  try {
    const response = await instance.post("/tools/fetch-key", { query });
    return response.data;
  } catch (error) {
    // Обработка ошибок здесь
    console.error("Ошибка запроса счетов:", error);
    throw error; // Пробросить ошибку для обработки в вызывающем коде
  }
};
