import mongoose, { version } from "mongoose";

const instructorRequestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    message: {
      type: String,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    whyYouWantToTeach: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "30d",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InstructorRequest = mongoose.model(
  "InstructorRequest",
  instructorRequestSchema
);

export default InstructorRequest;
