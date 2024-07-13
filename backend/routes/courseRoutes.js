import express from "express";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  deleteLecture,
  updateLecture,
  createLecture,
} from "../controllers/courseController.js";
import protect from "../middlewere/protectMiddleware.js";
import reviewRouter from "./reviewRoutes.js";

const router = express.Router();

router.use("/:courseId/reviews", reviewRouter);

router
  .route("/")
  .get(getCourses)
  .post(protect(["instructor"]), createCourse);
router
  .route("/:slug")
  .get(getCourse)
  .patch(protect(["instructor"]), updateCourse)
  .delete(protect(["instructor", "admin"]), deleteCourse);

router
  .route("/:slug/:sectionId/:lectureId")
  .delete(protect(["instructor"]), deleteLecture)
  .patch(protect(["instructor"]), updateLecture);

router.route("/:slug/:sectionId").post(protect(["instructor"]), createLecture);

export default router;
