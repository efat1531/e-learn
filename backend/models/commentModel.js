import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "lessons",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
