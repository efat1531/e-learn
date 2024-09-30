import express from "express";
import protect from "../middlewere/protectMiddleware.js";
import {
  getMyCourseProgress,
  getCourseProgressById,
  updateCourseProgress,
  getSingleCourseProgress
} from "../controllers/courseProgressionController.js";

const router = express.Router();

router.route("/me").get(protect([]), getMyCourseProgress);
router.route("/me/:slug").get(protect([]), getSingleCourseProgress);
router
  .route("/:id")
  .get(protect([]), getCourseProgressById)
  .patch(protect([]), updateCourseProgress);

export default router;
