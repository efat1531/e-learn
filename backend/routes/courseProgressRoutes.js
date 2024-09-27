import express from "express";
import protect from "../middlewere/protectMiddleware.js";
import {
  getMyCourseProgress,
  getCourseProgressById,
  updateCourseProgress,
} from "../controllers/courseProgressionController.js";

const router = express.Router();

router.route("/me").get(protect([]), getMyCourseProgress);
router
  .route("/:id")
  .get(protect([]), getCourseProgressById)
  .patch(protect([]), updateCourseProgress);

export default router;
