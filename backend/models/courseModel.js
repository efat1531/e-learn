import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseSlug: {
      type: String,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: Number,
      required: true,
    },
    coursePrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Price must be greater than 0.",
      },
    },
    courseDiscount: {
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
            return value < this.coursePrice;
          },
          message: "Discount cannot be greater than the course price.",
        },
      ],
    },
    courseIntroVideo: {
      type: String,
    },
    whatYouWillLearn: {
      type: [String],
    },
    courseRequirements: [
      {
        requirement: {
          type: String,
          required: true,
        },
        need: {
          type: Boolean,
          default: false,
        },
      },
    ],
    courseContent: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          lessons: [
            {
              title: {
                type: String,
                required: true,
              },
              type: {
                type: String,
                required: true,
                enum: ["video", "resource"],
              },
              duration: {
                type: Number,
                required: function () {
                  return this.type === "video";
                },
              },
              markAsComplete: {
                type: Boolean,
                default: false,
              },
              link: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
      select: false,
    },
    courseInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    courseLevel: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    courseLanguage: {
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
    timestamps: true,
  }
);

courseSchema.pre("save", function (next) {
  this.courseSlug = this.courseName
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

const Course = mongoose.model("Course", courseSchema);

export default Course;
