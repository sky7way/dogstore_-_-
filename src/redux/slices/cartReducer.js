import { createSlice } from "@reduxjs/toolkit";
import calculatePriceAndCount from "../../utils/calculatePriceAndCount";
import getLSCardData from "../../utils/getLSCardData";

const saveLs = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
  localStorage.setItem("price", JSON.stringify(state.totalPrice));
  localStorage.setItem("count", JSON.stringify(state.totalCount));
};

const initialState = {
  items: getLSCardData().items || [],
  totalPrice: getLSCardData().totalPrice || 0,
  totalCount: getLSCardData().totalCount || 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj._id === action.payload._id
      );
      if (currentItem) {
        currentItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      calculatePriceAndCount(state);
      saveLs(state);
    },
    decrement: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj._id === action.payload._id
      );
      if (currentItem) {
        currentItem.count--;
      }
      calculatePriceAndCount(state);
      saveLs(state);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload._id);
      calculatePriceAndCount(state);
      saveLs(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
      saveLs(state);
    },
  },
});

export const selectCurrentItem = (id) => (state) =>
  state.cart.items.find((obj) => obj._id === id);

export const selectAllIds = (state) => state.cart.items.map((item) => item._id);

export const { addItem, decrement, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
