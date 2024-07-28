import userModel from "../models/userModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const existingUser = await userModel.findById(req.user._id).select("+role");

  if (!existingUser) {
    res.status(404);
    throw new Error("User not found. Please try again.");
  }

  res.status(201).json({
    data: existingUser,
  });
});

// @desc    Update user profile
// @route   POST /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const existingUser = await userModel.findById(req.user._id);

  if (!existingUser) {
    res.status(404);
    throw new Error("User not found. Please try again.");
  }
  const updateFields = ["name", "address", "profilePicture"];

  if (req.user.role === "instructor") {
    updateFields.push("bio");
    updateFields.push("designation");
  }

  const updateData = Object.keys(req.body)
    .filter((key) => updateFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = req.body[key];
      return obj;
    }, {});

  const updatedData = await userModel.findByIdAndUpdate(
    req.user._id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    data: updatedData,
  });
});

// @desc    User Password Update
// @route   POST /api/users/profile/password
// @access  Private
const updateUserPassword = asyncHandler(async (req, res) => {
  const existingUser = await userModel
    .findById(req.user._id)
    .select("+password");

  const { currentPassword, newPassword } = req.body;

  if (!existingUser) {
    res.status(404);
    throw new Error("User not found. Please try again.");
  }

  const isPasswordMatch = await existingUser.matchPassword(currentPassword);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid password. Please try again.");
  }

  if (currentPassword === newPassword) {
    res.status(400);
    throw new Error("New password cannot be the same as the current password.");
  }

  existingUser.password = req.body.newPassword;
  existingUser.passwordUpdatedAt = Date.now();

  await existingUser.save({ validateBeforeSave: true });

  res.status(201).json({
    message: "Password updated successfully.",
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});

  res.status(201).json({
    data: users,
  });
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await userModel.findByIdAndDelete(req.user._id);

  if (!existingUser) {
    res.status(404);
    throw new Error("User not found. Please try again.");
  }

  res.status(200).json({
    status: "success",
    message: "User deleted successfully.",
  });
});

export {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  deleteUser,
};
