import mongoose from "mongoose";
import Course from "./courseModel.js";

const ratingSchema = mongoose.Schema(
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

ratingSchema.statics.calculateAvgRating = async function (courseId) {
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

ratingSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

ratingSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calculateAvgRating(this.r.course);
});

ratingSchema.index({ course: 1, user: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
