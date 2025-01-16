import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousOrders: [],
  orderDetails: JSON.parse(localStorage.getItem("eLearnOrderDetails")) || null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
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
