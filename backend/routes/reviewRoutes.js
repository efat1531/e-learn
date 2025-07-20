import express from "express";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import protect from "../middlewere/protectMiddleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getReviews)
  .post(protect(["student", "admin"]), createReview);
router
  .route("/:id")
  .get(getReview)
  .patch(protect(["student", "admin"]), updateReview)
  .delete(protect(["student", "admin"]), deleteReview);

export default router;
