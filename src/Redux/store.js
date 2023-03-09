import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import cartReducer from "./slices/cartReducer";
import likeReducer from "./slices/likeReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    like: likeReducer,
  },
});