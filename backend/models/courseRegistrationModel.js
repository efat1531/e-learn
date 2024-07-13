import mongoose from "mongoose";

const courseRegistrationSchema = mongoose.Schema(
  {
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
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    transactionID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CourseRegistration = mongoose.model(
  "CourseRegistration",
  courseRegistrationSchema
);

export default CourseRegistration;
