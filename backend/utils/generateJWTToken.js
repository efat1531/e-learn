import jwt from "jsonwebtoken";

const generateToken = (res, userId, role = false) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};

export { generateToken };
