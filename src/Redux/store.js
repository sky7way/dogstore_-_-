import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});