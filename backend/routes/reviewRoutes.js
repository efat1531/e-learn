import express from "express";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import protect from "../middlewere/protectMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getReviews)
  .post(protect(["student"]), createReview);
router
  .route("/:id")
  .get(getReview)
  .put(protect(["student"]), updateReview)
  .delete(protect(["student"]), deleteReview);

export default router;
