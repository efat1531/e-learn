import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    previousOrders: [],
    orderDetails: null,
  },

  reducers: {
    setPreviousOrders(state, action) {
      state.previousOrders = action.payload;
    },
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },

    clearOrderDetails(state) {
      state.orderDetails = null;
    },

    clearOrder(state) {
      state.user = null;
      state.previousOrders = [];
      state.orderDetails = null;
    },
  },
});

export const {
  setUser,
  setPreviousOrders,
  setOrderDetails,
  clearOrderDetails,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
