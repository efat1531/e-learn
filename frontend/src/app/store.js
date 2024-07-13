import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice.js";
import authReducer from "../features/authSlice.js";
import userReducer from "../features/userSlice.js";
import courseReducer from "../features/courseSlice.js";
import cartSlice from "../features/cartSlice.js";
import orderSlice from "../features/orderSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    course: courseReducer,
    cart: cartSlice,
    order: orderSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
