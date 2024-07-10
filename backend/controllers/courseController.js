import courseModel from "../models/courseModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await courseModel.find().populate("instructor", "name");

  res.status(200).json({
    status: "success",
    numberOfCourses: courses.length,
    data: courses,
  });
});

// @desc    Get single course
// @route   GET /api/courses/:slug
// @access  Public
const getCourse = asyncHandler(async (req, res) => {
  const course = await courseModel.findOne({ slug: req.params.slug });

  if (!course) {
    res.status(404);
    throw new Error("Course not found. Please try again.");
  }

  res.status(200).json({
    data: course,
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    duration,
    price,
    introVideo,
    whatYouWillLearn,
    requirements,
    discount = 0,
    discountExpires,
    courseContent,
    CourseCategory,
    level,
    language,
  } = req.body;
  const slug = title
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .split(" ")
    .join("-");

  const instructor = req.user;

  const existingCourse = await courseModel.findOne({ title });

  if (existingCourse) {
    res.status(400);
    throw new Error("Course already exists. Please try again.");
  }

  const course = await courseModel.create({
    title,
    description,
    duration,
    price,
    introVideo,
    whatYouWillLearn,
    requirements,
    discount,
    discountExpires,
    courseContent,
    CourseCategory,
    level,
    language,
    instructor: instructor._id,
  });

  instructor.courses.push(course._id);
  instructor.numOfCourses = instructor.courses.length;
  await instructor.save();

  res.status(201).json({
    data: course,
  });
});

export { getCourses, getCourse, createCourse };
