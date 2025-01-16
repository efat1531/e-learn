import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  deleteUser,
  getBestInstructors,
} from "../controllers/userController.js";
import express from "express";
import protect from "../middlewere/protectMiddleware.js";

const router = express.Router();

router.route("/best-instructors").get(getBestInstructors);

router.use(protect([]));
router.route("/profile").get(getUserProfile).patch(updateUserProfile);
router.route("/profile/password").post(updateUserPassword);

router.use(protect(["admin"]));
router.route("/").get(getUsers).delete(deleteUser);

export default router;
