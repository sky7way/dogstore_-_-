import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userReducer";
import cartReducer from "./Slices/cartReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
