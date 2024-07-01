import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
    TokenType: {
      type: String,
      required: true,
      enum: ["verify", "reset"],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt token
tokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.token = await bcrypt.hash(this.token, salt);
});

// Check for token validity
tokenSchema.methods.isValid = function () {
  return this.validTo > Date.now();
};

// Check for token validity
tokenSchema.methods.isCorrect = async function (token) {
  const isValid = await bcrypt.compare(token, this.token);
  const isNotUsed = !this.used;
  if (isValid && isNotUsed) {
    return true;
  }
  return false;
};

const Token = mongoose.model("Token", tokenSchema);

export default Token;
