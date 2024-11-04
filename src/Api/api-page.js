import axios from "axios";
import { setDataPageApp } from "../redux/page-reducer/page-reducer";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api`,
});

export const getPageApp = () => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/page/get-page-app`);
      const pageAppData = response.data.pageAppData;
      // Dispatch the setDataUser action to update the user data in the Redux store
      dispatch(setDataPageApp(pageAppData));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Ошибка запроса страниц инструментов:", error);
    }
  };
};

export const newPageApp = async (pageData) => {
  try {
    const response = await instance.post("/page/new-app", pageData);
    return response.data;
  } catch (error) {
    console.error("Ошибка добавления страницы при отправке на сервер:", error);
    throw error; // Перебросить ошибку для дальнейшей обработки
  } finally {
    getPageApp();
  }
};
