import userModel from "../models/userModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import { generateOTPToken } from "../utils/tokenGenerator.js";
import { decryptEmail, encrypt } from "../utils/textCipher.js";
import tokenModel from "../models/tokenModel.js";
import { generateToken } from "../utils/generateJWTToken.js";
import {
  sendWelcomeEmail,
  resendVerificationEmail,
  sendResetPasswordEmail,
} from "../utils/emailSender.js";

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  // Check if user exists
  if (userExists) {
    throw new Error("User already exists");
  }

  // Create user
  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  // Generate verify token
  const token = await generateOTPToken(newUser, "verify");

  // Send email
  const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${encrypt(
    email
  )}`;
  await sendWelcomeEmail(newUser.email, newUser.name, token, url);

  // Send response
  res.status(201).json({
    status: "success",
    message: "User registered successfully. Please verify your email.",
  });
});

// @desc    Verify user
// @route   POST /api/auth/:email
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const encryptedEmail = req.params.email;
  const token = req.body.token;

  const email = decryptEmail(encryptedEmail);
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("User already verified");
  }

  const oldToken = await tokenModel.findOne({
    email,
    TokenType: "verify",
  });

  if (!oldToken) {
    throw new Error("Invalid token. Please request a new one.");
  }

  const isMatch = await oldToken.isCorrect(token);

  if (!isMatch) {
    throw new Error("Invalid token");
  }

  const isValid = oldToken.isValid();

  if (!isValid) {
    throw new Error("Token expired");
  }

  // Delete token
  await tokenModel.findByIdAndDelete(oldToken._id);

  // Update user
  await userModel.findByIdAndUpdate(user._id, { isVerified: true });

  // JWT Cookie
  const JWTtoken = await generateToken(res, user._id, user.role);

  // Send response
  res.status(200).json({
    status: "success",
    message: "User verified successfully",
    token: JWTtoken,
  });
});

// @desc    Resend verification token
// @route   GET /api/auth/:email
// @access  Public
const resendToken = asyncHandler(async (req, res) => {
  const encryptedEmail = req.params.email;

  const email = decryptEmail(encryptedEmail);
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("User already verified");
  }

  const oldToken = await tokenModel.findOne({
    email,
    TokenType: "verify",
  });

  if (oldToken) {
    await tokenModel.findByIdAndDelete(oldToken._id);
  }

  const newToken = await generateOTPToken(user, "verify");

  // Send email
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/verify/${encryptedEmail}`;
  await resendVerificationEmail(user.email, user.name, newToken, url);

  // Send response
  res.status(200).json({
    status: "success",
    message: "Verification token sent successfully",
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);

  if (!user || !isMatch) {
    throw new Error("Invalid credentials");
  }

  // JWT Cookie
  const JTWToken = await generateToken(res, user._id, user.role);

  // Send response
  res.status(200).json({
    status: "success",
    token: JTWToken,
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingUser = await userModel.findOne({
    email,
  });

  if (!existingUser) {
    throw new Error("User not found with this email");
  }

  const token = await generateOTPToken(existingUser, "reset");

  // Send email
  const url = `${req.protocol}://${req.get("host")}/api/auth/reset/${encrypt(
    email
  )}/${token}`;

  await sendResetPasswordEmail(existingUser.email, existingUser.name, url);

  // Send response
  res.status(200).json({
    status: "success",
    message: "Password reset token sent successfully",
  });
});

// @desc   Reset password verification
// @route  GET /api/auth/reset/:email/:token
// @access Public
const verifyResetPasswordRequest = asyncHandler(async (req, res) => {
  const encryptedEmail = req.params.email;
  const token = req.params.token;

  const email = decryptEmail(encryptedEmail);
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found with this email");
  }

  const existingToken = await tokenModel.findOne({
    email,
    TokenType: "reset",
  });

  const isMatch = await existingToken.isCorrect(token);

  if (!existingToken || !isMatch) {
    throw new Error("Invalid token. Please request a new one.");
  }

  const isValid = existingToken.isValid();

  if (!isValid) {
    throw new Error("Token expired");
  }

  // Delete token
  await tokenModel.findByIdAndDelete(existingToken._id);

  // Send response
  res.status(200).json({
    status: "success",
    message: "Token verified successfully. Please reset your password.",
  });
});

// @desc   Reset password
// @route  POST /api/auth/reset/:email
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const encryptedEmail = req.params.email;
  const { password } = req.body;

  const email = decryptEmail(encryptedEmail);
  const existingUser = await userModel.findOne({
    email,
  });

  if (!existingUser) {
    throw new Error(
      "No user found with this email. Please check your verification link."
    );
  }

  // Update password
  existingUser.password = password;
  await existingUser.save();

  // Send response
  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
});

// @desc  logout user
// @route POST /api/auth/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  // Clear cookie
  res.clearCookie("eLearnJWT");
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
});

export {
  register,
  verifyUser,
  login,
  logout,
  resendToken,
  forgotPassword,
  resetPassword,
  verifyResetPasswordRequest,
};
