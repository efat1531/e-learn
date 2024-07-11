import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials(state, action) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setTempCredentials(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setTempCredentials } =
  authSlice.actions;

export default authSlice.reducer;
