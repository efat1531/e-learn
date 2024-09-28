import express from "express";
import {
  createPaymentIntentStripe,
  updatePaymentIntentStripe,
} from "../controllers/paymentController.js";
import protect from "../middlewere/protectMiddleware.js";

const router = express.Router();

router
  .route("/stripe/create-payment-intent")
  .post(protect([]), createPaymentIntentStripe);

router.route("/stripe/update-payment-intent").post(updatePaymentIntentStripe);

export default router;
