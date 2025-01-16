import { createSlice } from "@reduxjs/toolkit";
import { CURRENCY_LIST } from "../utils/Static_Currency_Variables";

const initialState = {
  id: null,
  name: null,
  role: null,
  email: null,
  courseList: [],
  profilePicture: null,
  authenticated: false,
  needFetch: true,
  wishList: [],
  currency: JSON.parse(localStorage.getItem("eLearn-currency")) ?? CURRENCY_LIST['BDT'].name,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearCredentials: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("eLearn-userInfo");
      localStorage.removeItem("eLearnOrderDetails");
    },
    setCredentials: (state, action) => {
      localStorage.setItem("eLearn-userInfo", JSON.stringify(action.payload));
    },
    setCurrency: (state, action) => {
      localStorage.setItem("eLearn-currency", JSON.stringify(action.payload));
      
    },
    setUserInformation: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.courseList = action.payload.courses;
      state.profilePicture = action.payload.profilePicture;
      state.authenticated = true;
      state.needFetch = false;
      state.wishList = action.payload.wishList;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { clearCredentials, setCredentials, setUserInformation, setProfilePicture } =
  authSlice.actions;

export default authSlice.reducer;
