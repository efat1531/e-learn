import mongoose from "mongoose";
import courseModel from "./courseModel.js";
import userModel from "./userModel.js";

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
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
  },
  {
    timestamps: true,
  }
);

reviewSchema.statics.calculateAvgRating = async function (courseId) {
  const stats = await this.aggregate([
    {
      $match: { course: courseId },
    },
    {
      $group: {
        _id: "$course",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await courseModel.findByIdAndUpdate(courseId, {
      courseRating: stats[0].avgRating,
      numberOfRating: stats[0].nRating,
    });
  } else {
    await courseModel.findByIdAndUpdate(courseId, {
      courseRating: 4.5,
      numberOfRating: 0,
    });
  }

  const course = await courseModel.findById(courseId);
  const instructorId = course.instructor;
  const instructorRatingStats = await courseModel.aggregate([
    {
      $match: { instructor: instructorId },
    },
    {
      $group: {
        _id: "$instructor",
        newAvgRating: { $avg: "$courseRating" },
      },
    },
  ]);
  if (instructorRatingStats.length > 0) {
    await userModel.findByIdAndUpdate(instructorId, {
      rating: instructorRatingStats[0].newAvgRating,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calculateAvgRating(this.course);
});

reviewSchema.pre("^find", function (next) {
  this.populate({
    path: "user",
    select: "name profilePicture",
  });
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calculateAvgRating(this.r.course);
});

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
