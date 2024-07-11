import mongoose from "mongoose";
import Course from "./courseModel.js";

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
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
    await Course.findByIdAndUpdate(courseId, {
      courseRating: stats[0].avgRating,
      courseStudents: stats[0].nRating,
    });
  } else {
    await Course.findByIdAndUpdate(courseId, {
      courseRating: 4.5,
      numberOfRating: 0,
    });
  }
};

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calculateAvgRating(this.r.course);
});

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

const Rating = mongoose.model("Review", reviewSchema);

export default Rating;
