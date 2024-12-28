import axios from "axios";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api/tools`,
});

export const getIksSite = (siteArray) => {
  return async (dispatch) => {
    const chunkSize = 1000; // Размер одного "куска" массива
    const chunks = [];

    // Разбиваем массив на части
    for (let i = 0; i < siteArray.length; i += chunkSize) {
      chunks.push(siteArray.slice(i, i + chunkSize));
    }

    const allResults = [];
    for (let chunk of chunks) {
      try {
        const response = await instance.post(`/get-iks`, chunk);
        allResults.push(...response.data.results); // Собираем результаты
      } catch (error) {
        console.error("Ошибка получения ИКС сайтов:", error);
        throw error;
      }
    }

    return allResults;
  };
};

export const getDomenDelete = () => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/get-domen-delete-ru`);
      return response.data;
    } catch (error) {
      console.error("Ошибка получения доменов на удаление:", error);
      throw error;
    }
  };
};
