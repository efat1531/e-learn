import mongoose, { version } from "mongoose";

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
    versionKey: false,
  }
);

courseProgressionSchema.index({ user: 1, course: 1 }, { unique: true });

const courseProgression = mongoose.model(
  "courseProgression",
  courseProgressionSchema
);

export default courseProgression;
