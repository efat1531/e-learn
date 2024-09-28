import mongoose from "mongoose";

const courseContentItemsSchema = mongoose.Schema(
  {
    contentType: {
      type: String,
      required: true,
      enum: ["video", "document", "quiz"],
    },
    contentTitle: {
      type: String,
      required: true,
    },
    contentURL: {
      type: String,
      required: true,
      select: false,
    },
    contentDuration: {
      type: Number,
      default: 0,
    },
    contentDescription: {
      type: String,
      select: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const courseContent = mongoose.model("CourseContent", courseContentItemsSchema);

export default courseContent;
