import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  token: "",
  products: [],
  editedProduct: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (obj) => obj._id !== action.payload._id
      );
    },
    setEditedProduct: (state, action) => {
      state.editedProduct = action.payload;
    },
    editProduct: (state, action) => {
      const i = state.products.findIndex(
        (el) => el._id === state.editedProduct._id
      );
      i !== -1 && state.products.splice(i, 1, action.payload);
    },
  },
});

export const {
  setToken,
  addProduct,
  deleteProduct,
  clearToken,
  setEditedProduct,
  setUserId,
  editProduct,
} = userSlice.actions;

export default userSlice.reducer;
