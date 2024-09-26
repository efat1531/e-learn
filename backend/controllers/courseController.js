import courseModel from "../models/courseModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import courseContentModel from "../models/courseContentModel.js";

import DynamicFilter from "../utils/dynamicFilter.js";
import DynamicSort from "../utils/dynamicSort.js";
import AppError from "../utils/AppError.js";
import { areFieldsValid } from "../utils/nullValueCheck.js";

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const { limit = 20, page = 1 } = req.query;

  const dynamicFilter = new DynamicFilter(req.query);
  const dynamicSort = new DynamicSort(req.query);

  // Filter Options
  const filterOptions = dynamicFilter.process();
  const sortOptions = dynamicSort.process();

  const totalResults = await courseModel.countDocuments({
    ...filterOptions,
  });

  const courses = await courseModel
    .find({
      ...filterOptions,
    })
    .sort({
      ...sortOptions,
    })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate("instructor", "name")
    .populate({
      path: "courseContent.sectionContainer",
      select: "contentType contentTitle contentDuration",
    });

  res.status(200).json({
    status: "success",
    totalResults,
    currentPage: page,
    limit,
    totalPage: Math.ceil(totalResults / limit),
    data: courses,
  });
});

// @desc    Get single course
// @route   GET /api/courses/:slug
// @access  Public
const getCourse = asyncHandler(async (req, res) => {
  const course = await courseModel
    .findOne({ slug: req.params.slug })
    .populate({
      path: "instructor",
      select:
        "name profilePicture rating numberOfStudents numOfCourses designation bio",
    })
    .populate({
      path: "courseContent.sectionContainer",
      select: "contentType contentTitle contentDuration",
    })
    .populate({
      path: "reviews",
      select: "rating comment user updatedAt",
      populate: {
        path: "user",
        select: "name profilePicture",
      },
    });

  if (!course) {
    throw AppError.notFound("Course not found. Please try again.");
  }

  res.status(200).json({
    status: "success",
    data: course,
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = asyncHandler(async (req, res) => {
  const {
    title, //
    description, //
    duration, //
    price, //
    introVideo, //
    whatYouWillLearn, //
    requirements, //
    discount = 0, //
    discountExpires, //
    courseContent, //
    summary, //
    level, //
    language, //
  } = req.body;

  const slug = title
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .split(" ")
    .join("-");

  const instructor = req.user;

  const existingCourse = await courseModel.findOne({ slug });

  if (existingCourse) {
    throw AppError.badRequest("Course with this title already exists.");
  }

  const requiredFields = [
    "title",
    "description",
    "duration",
    "price",
    "introVideo",
    "whatYouWillLearn",
    "requirements",
    "discountExpires",
    "courseContent",
    "summary",
    "level",
    "language",
  ];

  if (!areFieldsValid(req.body, requiredFields)) {
    throw AppError.badRequest("Please fill all the required fields.");
  }

  const courseData = {
    title,
    slug,
    description,
    duration,
    summary,
    price,
    introVideo,
    whatYouWillLearn,
    requirements,
    discount,
    discountExpires,
    level,
    language,
    instructor: instructor._id,
  };

  const courseContentProcess = [];

  for (const section of courseContent) {
    const sectionContainer = [];
    for (const item of section.sectionContainer) {
      const content = await courseContentModel.create({
        ...item,
      });
      sectionContainer.push(content._id);
    }
    courseContentProcess.push({
      sectionTitle: section.sectionTitle,
      sectionContainer: sectionContainer,
    });
  }

  courseData.courseContent = courseContentProcess;

  // return res.send(courseData);

  const course = await courseModel.create(courseData);

  instructor.courses.push(course._id);
  instructor.numOfCourses = instructor.courses.length;
  await instructor.save();

  res.status(201).json({
    status: "success",
    message: "Course created successfully.",
    data: course,
  });
});

// @desc    Update course
// @route   Patch /api/courses/:slug
// @access  Private/Instructor
const updateCourse = asyncHandler(async (req, res) => {
  const course = await courseModel
    .findOne({ slug: req.params.slug })
    .populate("courseContent.sectionContainer");

  if (!course) {
    throw AppError.notFound("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    throw AppError.unauthorized("You are not authorized to update this course");
  }

  const allowedFields = [
    "title",
    "summary",
    "description",
    "duration",
    "price",
    "introVideo",
    "whatYouWillLearn",
    "requirements",
    "discount",
    "discountExpires",
    "level",
    "language",
    "titleImage",
  ];

  const updateData = Object.keys(req.body).reduce((obj, key) => {
    if (allowedFields.includes(key)) {
      obj[key] = req.body[key];
    }
    return obj;
  }, {});

  // return res.send(updateData);

  if (updateData.price || updateData.discount) {
    const price = updateData.price || course.price;
    const discount = updateData.discount || course.discount;
    if (discount > price) {
      throw AppError.badRequest("Discount cannot be greater than price.");
    }
    if (price <= 0) {
      throw AppError.badRequest("Price must be greater than 0.");
    }
  }

  const updatedCourse = await courseModel.findByIdAndUpdate(
    course._id,
    updateData,
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Course updated successfully.",
    data: updatedCourse,
  });
});

// @desc    Delete course
// @route   DELETE /api/courses/:slug
// @access  Private/Instructor or Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await courseModel.findOne({ slug: req.params.slug });
  if (!course) {
    throw AppError.notFound("Course not found. Please try again.");
  }

  if (
    course.instructor.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw AppError.unauthorized("You are not authorized to delete this course");
  }

  if (course.courseStudents > 0) {
    throw AppError.badRequest(
      "Course cannot be deleted as students are enrolled."
    );
  }

  // Delete course content
  for (const section of course.courseContent) {
    for (const item of section.sectionContainer) {
      await courseContentModel.findByIdAndDelete(item);
    }
  }

  // Delete course
  await courseModel.findByIdAndDelete(course._id);

  // Remove course from instructor
  const instructor = await userModel.findById(course.instructor);
  instructor.courses = instructor.courses.filter(
    (courseId) => courseId.toString() !== course._id.toString()
  );
  instructor.numOfCourses = instructor.courses.length;
  await instructor.save();

  res.status(200).json({
    status: "success",
    message: "Course deleted successfully.",
  });
});

// @desc    Delete lecture
// @route   DELETE /api/courses/:slug/:sectionId/:lectureId
// @access  Private/Instructor
const deleteLecture = asyncHandler(async (req, res) => {
  const course = await courseModel.findOne({ slug: req.params.slug });
  if (!course) {
    throw AppError.notFound("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    throw AppError.unauthorized(
      "You are not authorized to delete this lecture."
    );
  }

  const section = course.courseContent.find(
    (section) => section._id.toString() === req.params.sectionId
  );

  if (!section) {
    throw AppError.notFound("Section not found. Please try again.");
  }

  const lectureIndex = section.sectionContainer.findIndex(
    (lecture) => lecture.toString() === req.params.lectureId
  );

  if (lectureIndex === -1) {
    throw AppError.notFound("Lecture not found. Please try again.");
  }

  section.sectionContainer.splice(lectureIndex, 1);

  await courseContentModel.findByIdAndDelete(req.params.lectureId);

  await course.save();

  res.status(200).json({
    status: "success",
    message: "Lecture deleted successfully.",
    data: course,
  });
});

// @desc    Update lecture
// @route   PATCH /api/courses/:slug/:sectionId/:lectureId
// @access  Private/Instructor
const updateLecture = asyncHandler(async (req, res) => {
  const course = await courseModel
    .findOne({ slug: req.params.slug })
    .populate("courseContent.sectionContainer");
  if (!course) {
    throw AppError.notFound("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    throw AppError.unauthorized(
      "You are not authorized to update this lecture."
    );
  }
  const allowedFields = [
    "contentType",
    "contentTitle",
    "contentURL",
    "contentDuration",
    "contentDescription",
  ];

  const updateData = Object.keys(req.body).reduce((obj, key) => {
    if (allowedFields.includes(key)) {
      obj[key] = req.body[key];
    }
    return obj;
  }, {});

  const updatedLecture = await courseContentModel.findByIdAndUpdate(
    req.params.lectureId,
    updateData,
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Lecture updated successfully.",
    data: updatedLecture,
  });
});

// @desc    Create lecture
// @route   POST /api/courses/:slug/:sectionId
// @access  Private/Instructor
const createLecture = asyncHandler(async (req, res) => {
  const course = await courseModel.findOne({ slug: req.params.slug });

  if (!course) {
    throw AppError.notFound("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    throw AppError.unauthorized("You are not authorized to create lecture.");
  }

  const section = course.courseContent.find(
    (section) => section._id.toString() === req.params.sectionId
  );

  if (!section) {
    throw AppError.notFound("Section not found. Please try again.");
  }

  const allowedFields = [
    "contentType",
    "contentTitle",
    "contentURL",
    "contentDuration",
    "contentDescription",
  ];

  const newLectureData = Object.keys(req.body).reduce((obj, key) => {
    if (allowedFields.includes(key)) {
      obj[key] = req.body[key];
    }
    return obj;
  }, {});

  const newLecture = await courseContentModel.create({
    ...newLectureData,
  });

  section.sectionContainer.push(newLecture._id);

  await course.save();

  res.status(201).json({
    status: "success",
    message: "Lecture created successfully.",
    data: newLecture,
  });
});

// @desc    Get top rated courses
// @route   GET /api/courses/top
// @access  Public
const getTopCourses = asyncHandler(async (req, res) => {
  const courses = await courseModel
    .find({})
    .sort({ rating: -1 })
    .limit(10)
    .populate("instructor", "name");

  res.status(200).json({
    status: "success",
    data: courses,
  });
});

// @desc  Recently added courses
// @route GET /api/courses/recent
// @access Public
const getRecentCourses = asyncHandler(async (req, res) => {
  const courseLimit = req.query.limit || 10;
  const courses = await courseModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(courseLimit)
    .populate("instructor", "name");

  res.status(200).json({
    status: "success",
    data: courses,
  });
});

export {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  deleteLecture,
  updateLecture,
  createLecture,
  getTopCourses,
  getRecentCourses,
};
