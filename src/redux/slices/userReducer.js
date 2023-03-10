import { createSlice } from "@reduxjs/toolkit";
import getLSData from "../../utils/getLSData";

const initialState = {
  token: getLSData() || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state, action) => {
      state.token = "";
    },
  },
});

export const { changeToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
