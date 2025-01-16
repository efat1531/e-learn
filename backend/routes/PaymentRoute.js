import express from "express";
import {
  createPaymentIntentStripe,
  updatePaymentIntentStripe,
  createPaymentIntentAmarPay,
  amarPayVerification,
} from "../controllers/paymentController.js";
import protect from "../middlewere/protectMiddleware.js";

const router = express.Router();

router
  .route("/stripe/create-payment-intent")
  .post(protect([]), createPaymentIntentStripe);

router.route("/stripe/update-payment-intent").post(updatePaymentIntentStripe);

router
  .route("/amarPay/create-payment-intent")
  .post(protect([]), createPaymentIntentAmarPay);

router
  .route("/amarPay/update-payment-intent")
  .post( amarPayVerification);

export default router;
