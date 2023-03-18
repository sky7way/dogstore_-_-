import { createSlice } from "@reduxjs/toolkit";
import calculatePriceAndCount from "../../utils/calculatePriceAndCount";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
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
    },
    decrement: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj._id === action.payload._id
      );
      if (currentItem) {
        currentItem.count--;
      }
      calculatePriceAndCount(state);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload._id);
      calculatePriceAndCount(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCurrentItem = (id) => (state) =>
  state.cart.items.find((obj) => obj._id === id);

export const selectAllIds = (state) => state.cart.items.map((item) => item._id);

export const { addItem, decrement, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
