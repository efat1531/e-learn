import mongoose from "mongoose";

const courseProgressionSchema = mongoose.Schema(
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
    courseContent: {
      type: [
        {
          sectionTitle: {
            type: String,
            required: true,
          },
          sectionContainer: {
            type: [
              {
                content_id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "CourseContent",
                  required: true,
                },
                isCompleted: {
                  type: Boolean,
                  default: false,
                },
              },
            ],
            required: true,
          },
        },
      ],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

courseProgressionSchema.virtual("completionPercentage").get(function () {
  if (!this.courseContent || this.courseContent.length === 0) {
    return 0;
  }

  const totalContent = this.courseContent.reduce((acc, section) => {
    return (
      acc +
      section.sectionContainer.filter(
        (item) => item.content_id.contentType === "video"
      ).length
    );
  }, 0);

  const completedContent = this.courseContent.reduce((acc, section) => {
    return (
      acc +
      section.sectionContainer.filter(
        (item) => item.content_id.contentType === "video" && item.isCompleted
      ).length
    );
  }, 0);

  const completionPercentage =
    totalContent === 0 ? 0 : (completedContent / totalContent) * 100;
  return Math.floor(completionPercentage);
});

courseProgressionSchema.index({ user: 1, course: 1 }, { unique: true });

const courseProgression = mongoose.model(
  "courseProgression",
  courseProgressionSchema
);

export default courseProgression;
