import userModel from "../models/userModel";
import asyncHandler from "../middlewere/asyncHandler";
import { generateOTPToken } from "../utils/tokenGenerator";
import { decryptEmail } from "../utils/textCypher";
import tokenModel from "../models/tokenModel";
import { generateToken } from "../utils/generateJWTToken";

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
    token,
    TokenType: "verify",
    active: true,
  });

  if (!oldToken) {
    throw new Error("Invalid token");
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
  await generateToken(res, user._id, user.role);

  // Send response
  res.status(200).json({
    status: "success",
    message: "User verified successfully",
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
    isVerified: false,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const oldToken = await tokenModel.findOne({
    email,
    TokenType: "verify",
    active: true,
  });

  if (oldToken) {
    await tokenModel.findByIdAndDelete(oldToken._id);
  }

  const newToken = await generateOTPToken(user, "verify");

  // Send email

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

  const user = await userModel.findOne({ email });

  const isMatch = await user.matchPassword(password);

  if (!user || !isMatch) {
    throw new Error("Invalid credentials");
  }

  // JWT Cookie
  await generateToken(res, user._id, user.role);

  // Send response
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
  });
});

export { register, verifyUser, login, resendToken };
