import axios from "axios";
import { setNotifications } from "../redux/user-reducer/user-reducer";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api`,
});

export const getNotificationMessage = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/user/get-message-support?userId=${userId}`
      );
      const notifications = response.data.notifications;
      // Dispatch the setNotifications action to update only the notifications in the Redux store
      dispatch(setNotifications(notifications)); // Assuming you have setNotifications action creator
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};

export const clearNotificationMessage = (userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `/user/clear-message-support?userId=${userId}`
      );
      // Dispatch the setNotifications action to update only the notifications in the Redux store
      dispatch(getNotificationMessage(userId)); // Assuming you have setNotifications action creator
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
