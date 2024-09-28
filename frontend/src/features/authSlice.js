import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  role: null,
  email: null,
  courseList: [],
  profilePicture: null,
  authenticated: false,
  needFetch: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearCredentials: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("eLearn-userInfo");
    },
    setCredentials: (state, action) => {
      localStorage.setItem("eLearn-userInfo", JSON.stringify(action.payload));
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
    },
  },
});

export const { clearCredentials, setCredentials, setUserInformation } =
  authSlice.actions;

export default authSlice.reducer;
