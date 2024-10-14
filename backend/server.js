import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import { errorHandler, notFound } from "./middlewere/errorHandler.js";
import corsOptions from "./config/corsOptions.js";
import connectionDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authMiddlewere from "./middlewere/authMiddlewere.js";
import courseRoutes from "./routes/courseRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/PaymentRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import courseProgressionRoutes from "./routes/courseProgressRoutes.js";
import instructorRequestRoutes from "./routes/becomeAnInstructorRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

connectionDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb", extended: true }));

app.use(cookieParser());

// Routes
app.use(authMiddlewere);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/course-progresses", courseProgressionRoutes);
app.use("/api/instructor-request", instructorRequestRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
