import express from "express";
import {
  login,
  register,
  logout,
  verifyUser,
  resendToken,
  forgotPassword,
  resetPassword,
  verifyResetPasswordRequest,
} from "../controllers/authController.js";

const router = express.Router();

const printMiddleware = (req, res, next) => {
  console.log("Middleware");
  next();
};

router.route("/register").post(register);
router.route("/verify/:email").post(verifyUser).get(resendToken);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:email/:token").get(verifyResetPasswordRequest);
router.route("/reset/:email").post(resetPassword);

export default router;
