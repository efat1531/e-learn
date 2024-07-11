import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("eLearn-userInfo")
    ? JSON.parse(localStorage.getItem("eLearn-userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("eLearn-userInfo", JSON.stringify(action.payload));
    },
    clearCredentials(state, action) {
      state.userInfo = null;
      localStorage.removeItem("eLearn-userInfo");
    },
    setTempCredentials(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setTempCredentials } =
  authSlice.actions;

export default authSlice.reducer;
