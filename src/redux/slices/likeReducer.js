import { createSlice } from "@reduxjs/toolkit";
import getLSLikeData from "../../utils/getLSLikesData";

const saveLs = (state) => {
  localStorage.setItem("likes", JSON.stringify(state.items));
};

const initialState = {
  items: getLSLikeData() || [],
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    likeItem: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj._id === action.payload._id
      );
      if (currentItem) {
        return;
      } else {
        state.items.push(action.payload);
      }
      saveLs(state);
    },

    dislikeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload._id);
      saveLs(state);
    },
  },
});

export const selectCurrentLikeItem = (id) => (state) =>
  state.like.items.find((obj) => obj._id === id);

export const { likeItem, dislikeItem } = likeSlice.actions;

export default likeSlice.reducer;
