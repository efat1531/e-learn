import reviewModel from "../models/reviewModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import AppError from "../utils/AppError.js";
import DynamicFilter from "../utils/dynamicFilter.js";
import DynamicSort from "../utils/dynamicSort.js";

// @desc    Get all reviews
// @route   GET /api/reviews | /api/courses/:courseId/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const dynamicFilter = new DynamicFilter(req.query);
  const dynamicSort = new DynamicSort(req.query);

  const filterOptions = dynamicFilter.process();
  const sortOptions = dynamicSort.process();

  const query = req.params.courseId
    ? { course: req.params.courseId, ...filterOptions }
    : { ...filterOptions };

  const totalResults = await reviewModel.countDocuments(query);
  const reviews = await reviewModel
    .find(query)
    .sort(sortOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    status: "success",
    totalResults,
    currentPage: page * 1,
    limit: limit * 1,
    totalPage: Math.ceil(totalResults / limit),
    data: reviews,
  });
});

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
const getReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findById(req.params.id).populate({
    path: "user",
    select: "name email",
  });
  if (!review) {
    throw new AppError.notFound("Review not found. Please try again.");
  }
  res.status(200).json({
    status: "success",
    data: review,
  });
});

// @desc    Create new review
// @route   POST /api/courses/:courseId/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;

  if (!req.params.courseId) {
    throw new AppError.badRequest("Please provide a course ID.");
  }

  const reviewFields = {
    comment: req.body.comment,
    rating: req.body.rating,
    course: req.params.courseId,
    user: req.user._id,
  };

  const previousReview = await reviewModel.findOne({
    course: req.params.courseId,
    user: req.user._id,
  });

  if (previousReview) {
    throw new AppError.badRequest("You have already reviewed this course.");
  }

  const ifAllowed = await req.user.checkIfAllowedToReview(req.params.courseId);

  if (!ifAllowed && req.user.role !== "admin") {
    throw new AppError.badRequest(
      "You are not allowed to review this course. Please try again."
    );
  }

  const review = await reviewModel.create(reviewFields);
  await reviewModel.calculateAvgRating(req.params.courseId);

  res.status(201).json({
    status: "success",
    data: review,
  });
});

// @desc    Update review
// @route   PATCH /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  let review = await reviewModel.findById(req.params.id);
  if (!review) {
    throw new AppError.notFound("Review not found. Please try again.");
  }

  if (review.user.toString() !== req.user._id.toString()) {
    throw new AppError.unauthorized(
      "You are not authorized to update this review."
    );
  }

  const allowedFields = ["comment", "rating"];

  const updatedFields = {};
  allowedFields.forEach((field) => {
    if (req.body[field]) updatedFields[field] = req.body[field];
  });

  review = await reviewModel.findByIdAndUpdate(req.params.id, updatedFields, {
    new: true,
    runValidators: true,
  });

  await reviewModel.calculateAvgRating(review.course);

  res.status(200).json({
    status: "success",
    data: review,
  });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) {
    throw new AppError.notFound("Review not found. Please try again.");
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new AppError.unauthorized(
      "You are not authorized to delete this review."
    );
  }

  await reviewModel.findByIdAndDelete(req.params.id);
  await reviewModel.calculateAvgRating(review.course);

  res.status(204).json({
    status: "success",
    message: "Review deleted successfully.",
  });
});

export { getReviews, getReview, createReview, updateReview, deleteReview };
