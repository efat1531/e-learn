import express from "express";
import {
  login,
  register,
  verifyUser,
  resendToken,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/verify/:email").post(verifyUser).get(resendToken);
router.route("/login").post(login);

export default router;
