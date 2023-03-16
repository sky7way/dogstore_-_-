import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
  },
});

export const { setSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
