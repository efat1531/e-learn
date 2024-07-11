import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

const authMiddlewere = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const existingUser = await userModel
    .findById(decoded.userId)
    .select("+passwordUpdatedAt +role");

  if (!existingUser) {
    return next();
  }

  if (existingUser.passwordUpdatedAt) {
    const passwordChanged =
      existingUser.passwordUpdatedAt.getTime() > decoded.iat * 1000;

    if (passwordChanged) {
      return next();
    }
  }
  req.user = existingUser;
  next();
});

export default authMiddlewere;
