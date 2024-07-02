import express from "express";
import {
  login,
  register,
  verifyUser,
  resendToken,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/verify/:email").post(verifyUser).get(resendToken);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:email/:token").post(resetPassword);

export default router;
