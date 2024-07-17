import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-reducer/user-reducer";
import adminReducer from "./admin-reducer/admin-reducer";
import toolsReducer from "./tools-reducer/tools-reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    adminUser: adminReducer,
    toolsData: toolsReducer,
  },
});

export default store;
