import asyncHandler from "./asyncHandler.js";
const protect = ([...allowedRoles]) => {
  return asyncHandler(async (req, res, next) => {
    const existingUser = req.user;

    if (!existingUser) {
      res.status(401);
      throw new Error(
        "You are not signed in or sign-in expires. Please sign in again to access."
      );
    }

    if (!allowedRoles.includes(existingUser.role) && allowedRoles.length > 0) {
      res.status(403);
      throw new Error("You are not authorized to access this route.");
    }

    next();
  });
};

export default protect;
