import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 64,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: [
        {
          validator: function (value) {
            // Check if the password meets the basic criteria
            return validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 1,
              minNumbers: 1,
              minSymbols: 1,
              minUppercase: 0,
            });
          },
          message: "Password does not meet the basic criteria.",
        },
        {
          validator: function (value) {
            const score = validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 1,
              minNumbers: 1,
              minSymbols: 1,
              minUppercase: 0,
              returnScore: true,
            });
            const weakThreshold = 30;
            const tooWeakThreshold = 20;

            if (score < tooWeakThreshold) {
              this.message = "Password is too weak.";
              return false;
            } else if (score < weakThreshold) {
              this.message = "Password is weak.";
              return false;
            }
            return true;
          },
          message: "",
        },
      ],
    },
    passwordUpdatedAt: {
      type: Date,
      select: false,
    },
    bio: {
      type: String,
      select: false,
    },
    address: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "admin", "instructor"],
      select: false,
    },
    numOfCourses: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Match user's password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.passwordUpdatedAt = Date.now();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkIfAllowedToReview = async function (courseId) {
  return this.courses.map(String).includes(String(courseId));
};

const User = mongoose.model("User", userSchema);

export default User;
