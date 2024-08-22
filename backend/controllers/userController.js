import userModel from "../models/userModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import AppError from "../utils/AppError.js";
import DynamicFilter from "../utils/dynamicFilter.js";
import DynamicSort from "../utils/dynamicSort.js";
import { generateToken } from "../utils/generateJWTToken.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const existingUser = await userModel.findById(req.user._id).select("+role");

  if (!existingUser) {
    throw new AppError.notFound("User not found. Please try again.");
  }

  res.status(201).json({
    status: "success",
    data: existingUser,
  });
});

// @desc    Update user profile
// @route   POST /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const existingUser = await userModel.findById(req.user._id);

  if (!existingUser) {
    throw new AppError.notFound("User not found. Please try again.");
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
    status: "success",
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
    throw new AppError.notFound("User not found. Please try again.");
  }

  const isPasswordMatch = await existingUser.matchPassword(currentPassword);

  if (!isPasswordMatch) {
    throw new AppError.badRequest("Invalid password. Please try again.");
  }

  if (currentPassword === newPassword) {
    throw new AppError.badRequest(
      "New password cannot be same as old password. Please try again."
    );
  }

  existingUser.password = req.body.newPassword;
  existingUser.passwordUpdatedAt = Date.now();

  await existingUser.save({ validateBeforeSave: true });

  res.status(201).json({
    status: "success",
    message: "Password updated successfully.",
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const dynamicFilter = DynamicFilter(req.query);
  const dynamicSort = DynamicSort(req.query);

  const filterOptions = dynamicFilter.process();
  const sortOptions = dynamicSort.process();

  const totalResults = await userModel.countDocuments({
    ...filterOptions,
  });

  const users = await userModel
    .find({
      ...filterOptions,
    })
    .sort({
      ...sortOptions,
    })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(201).json({
    status: "success",
    totalResults,
    currentPage: page * 1,
    limit: limit * 1,
    totalPage: Math.ceil(totalResults / limit),
    data: users,
  });
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await userModel.findByIdAndDelete(req.user._id);

  if (!existingUser) {
    throw new AppError.notFound("User not found. Please try again.");
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
