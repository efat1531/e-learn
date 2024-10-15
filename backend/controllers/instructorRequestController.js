import asyncHandler from "../middlewere/asyncHandler.js";
import InstructorRequestModel from "../models/instructorRequestModel.js";
import UserModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";

// @desc    Create new instructor request
// @route   POST /api/instructor-request
// @access  Private
const createInstructorRequest = asyncHandler(async (req, res) => {
  const { resumeLink, whyYouWantToTeach, message } = req.body;
  const user = req.user._id;

  // Check if user has already submitted a request
  const existingRequest = await InstructorRequestModel.findOne({ user });
  if (existingRequest) {
    throw new AppError.badRequest("You have already submitted a request");
  }

  const newRequest = await InstructorRequestModel.create({
    user,
    resumeLink,
    whyYouWantToTeach,
    message,
  });

  res.status(201).json({
    status: "success",
    data: newRequest,
  });
});

// @desc    Get all instructor requests
// @route   GET /api/instructor-request
// @access  Private
const getAllInstructorRequests = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const matchStage = email ? { "user.email": email } : {};

  const requests = await InstructorRequestModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $match: {
        ...matchStage,
      },
    },
    {
      $addFields: {
        statusOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$status", "pending"] }, then: 1 },
              { case: { $eq: ["$status", "rejected"] }, then: 2 },
              { case: { $eq: ["$status", "accepted"] }, then: 3 },
            ],
            default: 4,
          },
        },
      },
    },
    {
      $sort: {
        statusOrder: 1,
        createdAt: -1,
      },
    },
    {
      $project: {
        user: {
          name: 1,
          email: 1,
        },
        resumeLink: 1,
        whyYouWantToTeach: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        message: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    totalRequests: requests.length,
    data: requests,
  });
});

// @desc    Get single instructor request
// @route   GET /api/instructor-request/:id
// @access  Private
const getInstructorRequest = asyncHandler(async (req, res) => {
  const request = await InstructorRequestModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!request) {
    throw new AppError.notFound("Request not found");
  }

  res.status(200).json({
    status: "success",
    data: request,
  });
});

// @desc    Update instructor request
// @route   PUT /api/instructor-request/:id
// @access  Private
const updateInstructorRequest = asyncHandler(async (req, res) => {
  const request = await InstructorRequestModel.findById(req.params.id);
  if (!request) {
    throw new AppError.notFound("Request not found");
  }

  const { resumeLink, whyYouWantToTeach, message } = req.body;

  request.resumeLink = resumeLink;
  request.whyYouWantToTeach = whyYouWantToTeach;
  request.message = message;

  await request.save();

  res.status(200).json({
    status: "success",
    data: request,
  });
});

// @desc    Delete instructor request
// @route   DELETE /api/instructor-request/:id
// @access  Private
const deleteInstructorRequest = asyncHandler(async (req, res) => {
  const request = await InstructorRequestModel.findById(req.params.id);
  if (!request) {
    throw new AppError.notFound("Request not found");
  }

  await request.remove();

  res.status(200).json({
    status: "success",
    message: "Request deleted successfully",
  });
});

// @desc    Approve instructor request
// @route   PUT /api/instructor-request/:id/approve
// @access  Private
const approveInstructorRequest = asyncHandler(async (req, res) => {
  const request = await InstructorRequestModel.findById(req.params.id);
  if (!request) {
    throw new AppError.notFound("Request not found");
  }

  request.status = "approved";
  await request.save();
  const user = await UserModel.findById(req.user._id);
  user.role = "instructor";
  res.status(200).json({
    status: "success",
    data: request,
  });
});

// @desc    Reject instructor request
// @route   PUT /api/instructor-request/:id/reject
// @access  Private
const rejectInstructorRequest = asyncHandler(async (req, res) => {
  const request = await InstructorRequestModel.findById(req.params.id);
  if (!request) {
    throw new AppError.notFound("Request not found");
  }

  request.status = "rejected";
  await request.save();

  res.status(200).json({
    status: "success",
    data: request,
  });
});

export {
  createInstructorRequest,
  getAllInstructorRequests,
  getInstructorRequest,
  updateInstructorRequest,
  deleteInstructorRequest,
  approveInstructorRequest,
  rejectInstructorRequest,
};
