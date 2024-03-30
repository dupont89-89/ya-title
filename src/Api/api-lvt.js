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

export const spendLvtOneTitle = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/user/spend-lvt-one-title?userId=${userId}`
      );
      dispatch(getUser(userId));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
