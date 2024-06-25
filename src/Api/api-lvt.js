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

export const spendLvt = (userId, sumLvt) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/user/spend-lvt?userId=${userId}&sumLvt=${sumLvt}`
      );
      dispatch(getUser(userId));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
export const addLvtUserBalance = (userId, lvt, money) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/user/add-lvt-user?userId=${userId}&lvt=${lvt}&money=${money}`
      );
      dispatch(getUser(userId));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
