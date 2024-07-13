import { createSlice } from "@reduxjs/toolkit";

const initState = {
  topCourses: [],
  newCourses: [],
  trendingCourses: [],
  courses: [],
  selectedCourse: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState: initState,
  reducers: {
    setSingleCourse(state, action) {
      state.selectedCourse = action.payload;
    },
    setTopCourses(state, action) {
      state.topCourses = action.payload;
    },
    setNewCourses(state, action) {
      state.newCourses = action.payload;
    },
    setTrendingCourses(state, action) {
      state.trendingCourses = action.payload;
    },
    setAllCourses(state, action) {
      state.courses = action.payload;
    },
    setSingleCourse(state, action) {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  setSingleCourse,
  setTopCourses,
  setNewCourses,
  setTrendingCourses,
  setAllCourses,
} = courseSlice.actions;

export default courseSlice.reducer;
