import express from "express";
import { createPaymentIntentStripe } from "../controllers/paymentController.js";
import protect from "../middlewere/protectMiddleware.js";

const router = express.Router();

router
  .route("/stripe/create-payment-intent")
  .post(protect([]), createPaymentIntentStripe);

export default router;
