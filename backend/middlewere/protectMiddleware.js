import asyncHandler from "./asyncHandler.js";
import AppError from "../utils/AppError.js";
const protect = ([...allowedRoles]) => {
  return asyncHandler(async (req, res, next) => {
    const existingUser = req.user;

    if (!existingUser) {
      throw AppError.notLoggedIn(
        "You are not signed in or sign-in expires. Please sign in again to access."
      );
    }

    if (!allowedRoles.includes(existingUser.role) && allowedRoles.length > 0) {
      throw AppError.forbidden("You are not allowed to access this route.");
    }

    next();
  });
};

export default protect;
