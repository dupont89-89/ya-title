import axios from "axios";
import { setDomenSubscription } from "../redux/tools-reducer/tools-reducer";

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
      return response.data;
    } catch (error) {
      console.error("Ошибка запроса домена Whois на фронтенде:", error);
    }
  };
};

export const subscriptionDomenWhois = (domen, userId, freeData, email) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/tools/whois-subscription?domen=${domen}&userId=${userId}&freeData=${freeData}&email=${email}`
      );
      return response.data; // Это промис, который вернется в await
    } catch (error) {
      console.error("Ошибка подписки домена Whois подписка:", error);
      throw error; // Не забываем выбросить ошибку, чтобы она попала в catch
    }
  };
};

export const deleteSubscriptionDomenWhois = (domen, userId) => {
  debugger;
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/tools/whois-subscription-delete?domen=${domen}&userId=${userId}`
      );
      return response.data; // Это промис, который вернется в await
    } catch (error) {
      console.error("Ошибка подписки домена Whois подписка:", error);
      throw error; // Не забываем выбросить ошибку, чтобы она попала в catch
    }
  };
};

export const getSubscriptionDomenUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/tools/get-domen-subscription?userId=${userId}`
      );

      // Проверяем, что response.data.domenData это массив, если нет - передаем пустой массив
      const domenData = Array.isArray(response.data.domenData)
        ? response.data.domenData
        : [];

      dispatch(setDomenSubscription(domenData));
      return response.data; // Возвращаем промис, чтобы его могли использовать
    } catch (error) {
      console.error("Ошибка запроса домена Whois подписка:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  };
};
