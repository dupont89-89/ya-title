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

export const addRefUser = (refUserId, userId) => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        `user/signup/ref?refUserId=${refUserId}&userId=${userId}`
      );
      // const userData = response.data.userData;
      // Dispatch the setDataUser action to update the user data in the Redux store
      // dispatch(setDataUser(userData));
      return response.data;
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error("Error fetching user data:", error);
    }
  };
};
