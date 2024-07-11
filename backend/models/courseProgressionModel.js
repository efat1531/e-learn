import mongoose from "mongoose";

const courseProgressionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  courseContent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course.courseContent",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const courseProgression = mongoose.model(
  "courseProgression",
  courseProgressionSchema
);

export default courseProgression;
