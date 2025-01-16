import jwt from "jsonwebtoken";

const generateToken = (res, userId, remember) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "10d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  };
  if (remember) {
    cookieOptions.maxAge = 10 * 24 * 60 * 60 * 1000;
  }
  // Set JWT as an HTTP-Only cookie
  res.cookie("eLearnJWT", token, cookieOptions);

  return token;
};

export { generateToken };
