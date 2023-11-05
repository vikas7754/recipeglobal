import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./states/theme";
import userReducer from "./states/user";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});
