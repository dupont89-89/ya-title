import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-reducer/user-reducer";
import adminReducer from "./admin-reducer/admin-reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    adminUser: adminReducer,
  },
});

export default store;
