import mongoose from "mongoose";

const courseContentSchema = mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true,
  },
  sectionContainer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseContent",
    },
  ],
});

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    duration: {
      type: Number,
    },
    titleImage: {
      image: String,
      lowResImage: String,
      blurData: String,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Price must be greater than 0.",
      },
    },
    discount: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: function (value) {
            return value >= 0;
          },
          message: "Discount cannot be negative.",
        },
        {
          validator: function (value) {
            return value <= this.price;
          },
          message: "Discount cannot be greater than the price.",
        },
      ],
    },

    discountExpires: {
      type: Date,
      default: Date.now,
    },

    introVideo: {
      type: String,
    },
    whatYouWillLearn: {
      type: [String],
    },
    requirements: {
      type: [String],
    },
    courseContent: [courseContentSchema],

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    language: {
      type: String,
      default: "English",
    },
    courseRating: {
      type: Number,
      default: 4.5,
    },
    numberOfRating: {
      type: Number,
      default: 0,
    },
    courseStudents: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .split(" ")
      .join("-");
  }
  next();
});

courseSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "course",
  localField: "_id",
});

courseSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.title) {
    this._update.slug = this._update.title
      .replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .split(" ")
      .join("-");
  }
  next();
});

courseSchema.virtual("currentPrice").get(function () {
  if (!this.discountExpires || this.discountExpires < Date.now()) {
    return this.price;
  }
  return this.price - this.discount;
});

courseSchema.methods.incrementStudents = async function () {
  this.courseStudents += 1;
  await this.save();
};

courseSchema.statics.findTrendingCourses = async function (limit = 10) {
  return this.find({}).sort({ courseStudents: -1 }).limit(limit);
};

const Course = mongoose.model("Course", courseSchema);

export default Course;
