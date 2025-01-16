import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToInstantBuy: (state, action) => {
      state.instantBuy = action.payload;
    },
    removeFromInstantBuy: (state, action) => {
      state.instantBuy = null;
    },
  },
});

export const { addToInstantBuy, removeFromInstantBuy } = cartSlice.actions;

export default cartSlice.reducer;
