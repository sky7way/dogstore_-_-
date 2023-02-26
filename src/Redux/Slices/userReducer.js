import { createSlice } from "@reduxjs/toolkit";
import getLSData from "../../Utils/getLSData";

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
  },
});

export const { changeToken } = userSlice.actions;

export default userSlice.reducer;
