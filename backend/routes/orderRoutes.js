import express from "express";
import protect from "../middlewere/protectMiddleware.js";
import { createOrder, getOrderById, getOrderByPaymentID, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect([]), createOrder).get(protect([]), getAllOrders);
router.route("/:id").get(getOrderById);
router.route("/payment/:id").get(getOrderByPaymentID);


export default router;
