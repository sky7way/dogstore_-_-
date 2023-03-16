import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import cartReducer from "./slices/cartReducer";
import likeReducer from "./slices/likeReducer";
import searchReducer from "./slices/searchReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    like: likeReducer,
    search: searchReducer,
  },
});
