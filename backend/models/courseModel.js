import mongoose from "mongoose";

const courseCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const courseContentItemsSchema = mongoose.Schema({
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
  finished: {
    type: Boolean,
    default: false,
    select: false,
  },
});

const courseContentSchema = mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true,
  },
  sectionContainer: [courseContentItemsSchema],
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
    duration: {
      type: Number,
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
    courseCategory: courseCategorySchema,
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
    courseReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("save", function (next) {
  this.slug = this.title
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .join("-");
  next();
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
