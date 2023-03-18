import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import cartReducer from "./slices/cartReducer";
import likeReducer from "./slices/likeReducer";
import searchReducer from "./slices/searchReducer";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    like: likeReducer,
    search: searchReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
