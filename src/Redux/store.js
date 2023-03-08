import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import cartReducer from "./slices/cartReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
