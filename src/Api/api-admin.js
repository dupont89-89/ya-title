import axios from "axios";
import { setAdminDataUser } from "../redux/admin-reducer/admin-reducer";
import { getUser } from "./api-user-login";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api/admin`,
});

export const getAdminUserData = () => {
  return async (dispatch) => {
    try {
      const response = await instance.get(`/admin-get-user`);
      const dataUser = response.data.users;
      dispatch(setAdminDataUser(dataUser));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
export const editAdminUserStatus = (userId, role) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/admin-edit-user-status?userId=${userId}&role=${role}`
      );
      dispatch(getAdminUserData());
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
export const addLvtAdminUser = (userId, lvt) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/admin-add-lvt-user?userId=${userId}&lvt=${lvt}`
      );
      dispatch(getAdminUserData());
      dispatch(getUser(userId));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
