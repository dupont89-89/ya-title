import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-reducer/user-reducer";
import adminReducer from "./admin-reducer/admin-reducer";
import toolsReducer from "./tools-reducer/tools-reducer";
import pageReducer from "./page-reducer/page-reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    adminUser: adminReducer,
    toolsData: toolsReducer,
    pageData: pageReducer,
  },
});

export default store;
