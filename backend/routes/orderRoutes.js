import express from "express";
import protect from "../middlewere/protectMiddleware.js";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect([]), createOrder).get(protect([]), getAllOrders);

export default router;
