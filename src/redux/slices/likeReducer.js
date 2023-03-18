import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
        state.items.push({ _id: action.payload._id });
      }
    },

    dislikeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.payload._id);
    },
  },
});

export const selectCurrentLikeItem = (id) => (state) =>
  state.like.items.find((obj) => obj._id === id);

export const selectAllIds = (state) => state.like.items.map((item) => item._id);

export const { likeItem, dislikeItem } = likeSlice.actions;

export default likeSlice.reducer;
