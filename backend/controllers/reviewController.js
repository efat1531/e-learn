import reviewModel from "../models/reviewModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";

// @desc    Get all reviews
// @route   GET /api/reviews | /api/courses/:courseId/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  if (req.params.courseId) {
    const reviews = await reviewModel.find({ course: req.params.courseId });
    res.status(200).json({
      status: "success",
      numberOfReviews: reviews.length,
      data: reviews,
    });
  } else {
    const reviews = await reviewModel.find({});
    res.status(200).json({
      status: "success",
      numberOfReviews: reviews.length,
      data: reviews,
    });
  }
});

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
const getReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found. Please try again.");
  }
  res.status(200).json({
    data: review,
  });
});

// @desc    Create new review
// @route   POST /api/courses/:courseId/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;

  if (!req.params.courseId) {
    res.status(400);
    throw new Error("Please provide a course id.");
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
    res.status(400);
    throw new Error("You have already reviewed this course.");
  }

  const ifAllowed = await req.user.checkIfAllowedToReview(req.params.courseId);

  if (!ifAllowed && req.user.role !== "admin") {
    res.status(400);
    throw new Error("You must enroll in this course before reviewing it.");
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
    res.status(404);
    throw new Error("Review not found. Please try again.");
  }

  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to update this review.");
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
    res.status(404);
    throw new Error("Review not found. Please try again.");
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(401);
    throw new Error("You are not authorized to delete this review.");
  }

  await reviewModel.findByIdAndDelete(req.params.id);
  await reviewModel.calculateAvgRating(review.course);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export { getReviews, getReview, createReview, updateReview, deleteReview };
