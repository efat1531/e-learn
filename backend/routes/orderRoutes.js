import express from "express";
import protect from "../middlewere/protectMiddleware.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect([]), createOrder);

export default router;
