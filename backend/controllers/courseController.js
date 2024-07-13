import courseModel from "../models/courseModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import courseContentModel from "../models/courseContentModel.js";

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await courseModel
    .find({})
    .populate("instructor", "name")
    .populate({
      path: "courseContent.sectionContainer",
      select: "contentType contentTitle contentDuration",
    });

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
    summary,
    level,
    language,
  } = req.body;
  const slug = title
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .split(" ")
    .join("-");

  const instructor = req.user;

  const existingCourse = await courseModel.findOne({ slug });

  if (existingCourse) {
    res.status(400);
    throw new Error("Course already exists. Please try again.");
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
    res.status(404);
    throw new Error("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to update this course.");
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

  if (updateData.price || updateData.discount) {
    const price = updateData.price || course.price;
    const discount = updateData.discount || course.discount;
    if (discount > price) {
      res.status(400);
      throw new Error("Discount cannot be greater than the price.");
    }
    if (price <= 0) {
      res.status(400);
      throw new Error("Price must be greater than 0.");
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
    res.status(404);
    throw new Error("Course not found. Please try again.");
  }

  if (
    course.instructor.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(401);
    throw new Error("You are not authorized to delete this course.");
  }

  if (course.courseStudents > 0) {
    res.status(400);
    throw new Error("Course cannot be deleted as it has enrolled users.");
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
    res.status(404);
    throw new Error("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to delete this lecture.");
  }

  const section = course.courseContent.find(
    (section) => section._id.toString() === req.params.sectionId
  );

  if (!section) {
    res.status(404);
    throw new Error("Section not found. Please try again.");
  }

  const lectureIndex = section.sectionContainer.findIndex(
    (lecture) => lecture.toString() === req.params.lectureId
  );

  if (lectureIndex === -1) {
    res.status(404);
    throw new Error("Lecture not found. Please try again.");
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
    res.status(404);
    throw new Error("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to update this lecture.");
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
    res.status(404);
    throw new Error("Course not found. Please try again.");
  }

  if (course.instructor.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to create this lecture.");
  }

  const section = course.courseContent.find(
    (section) => section._id.toString() === req.params.sectionId
  );

  if (!section) {
    res.status(404);
    throw new Error("Section not found. Please try again.");
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

export {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  deleteLecture,
  updateLecture,
  createLecture,
};
