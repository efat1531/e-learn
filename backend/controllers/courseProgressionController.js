import courseModel from "../models/courseModel.js";
import courseProgressionModel from "../models/courseProgressModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import AppError from "../utils/AppError.js";

// @desc    Get my course progress
// @route   GET /api/course-progresses/me
// @access  Private
const getMyCourseProgress = asyncHandler(async (req, res) => {
  const courseProgress = await courseProgressionModel.find({
    user: req.user._id,
  });

  if (!courseProgress) {
    throw AppError.notFound("No course progress found for this user.");
  }

  const totalResults = courseProgress.length;

  res.status(200).json({
    status: "success",
    totalResults,
    data: courseProgress,
  });
});

// @desc    Get single course progress by slug
// @route   GET /api/course-progresses/me/:slug
// @access  Private
const getSingleCourseProgress = asyncHandler(async (req, res) => {
  // Find the course
  const course = await courseModel.findOne({ slug: req.params.slug });

  if (!course) {
    throw AppError.notFound("No course found.");
  }

  const courseProgress = await courseProgressionModel
    .findOne({
      user: req.user._id,
      course: course._id,
    })
    .populate({
      path: "course",
      select: "title",
    })
    .populate({
      path: "courseContent.sectionContainer.content_id",
      select: "contentType contentTitle contentURL contentDuration",
    });

  if (!courseProgress) {
    throw AppError.notFound("No course progress found for this user.");
  }

  res.status(200).json({
    status: "success",
    data: courseProgress,
  });
});

// @desc    Get course progress by ID
// @route   GET /api/course-progresses/:id
// @access  Private
const getCourseProgressById = asyncHandler(async (req, res) => {
  if (req.user.role !== "instructor" && req.user.role !== "admin") {
    if (req.user.courses.includes(req.params.id)) {
      throw AppError.forbidden("You are not allowed to access this course.");
    }
  }

  const courseProgress = await courseProgressionModel
    .findById(req.params.id)
    .populate({
      path: "course",
      select: "title",
    })
    .populate({
      path: "courseContent.sectionContainer.content_id",
      select: "contentType contentTitle contentURL contentDuration",
    });

  if (!courseProgress) {
    throw AppError.notFound("No course progress found for this user.");
  }

  res.status(200).json({
    status: "success",
    data: courseProgress,
  });
});

// @desc Update course progress
// @route PATCH /api/course-progresses/:id
// @access Private
const updateCourseProgress = async (req, res) => {
  const courseProgress = await courseProgressionModel.findById(req.params.id)
    .populate({
      path: "course",
      select: "title",
    })
    .populate({
      path: "courseContent.sectionContainer.content_id",
      select: "contentType contentTitle contentURL contentDuration",
    });;

  if (!courseProgress) {
    throw AppError.notFound("No course progress found for this user.");
  }

  if (req.user.role !== "instructor" && req.user.role !== "admin") {
    if (req.user._id.toString() !== courseProgress.user.toString()) {
      throw AppError.forbidden(
        "You are not allowed to update this course progress."
      );
    }
  }

  const { courseContentId, isCompleted } = req.body;

  console.log(courseContentId);

  const sectionIndex = courseProgress.courseContent.findIndex((section) =>
    section.sectionContainer.find(
      (content) => content.content_id.id === courseContentId
    )
  );

  if (sectionIndex === -1) {
    throw AppError.badRequest("Invalid course content ID.");
  }

  const contentIndex = courseProgress.courseContent[
    sectionIndex
  ].sectionContainer.findIndex(
    (content) => content.content_id.id === courseContentId
  );
  
  if (contentIndex === -1) {
    throw AppError.badRequest("Invalid course content ID.");
  }

  courseProgress.courseContent[sectionIndex].sectionContainer[
    contentIndex
  ].isCompleted = isCompleted;

  await courseProgress.save();

  res.status(200).json({
    status: "success",
    message: "Course progress updated successfully.",
    data: courseProgress
  });
};

export {
  getMyCourseProgress,
  getCourseProgressById,
  updateCourseProgress,
  getSingleCourseProgress,
};
