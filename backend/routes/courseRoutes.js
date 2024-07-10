import express from "express";
import {
  getCourses,
  getCourse,
  createCourse,
} from "../controllers/courseController.js";
import protect from "../middlewere/protectMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(protect(["instructor", "admin"]), createCourse);
router.route("/:slug").get(getCourse);

export default router;
