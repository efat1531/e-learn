import stripe from "stripe";
import express from "express";
import dotenv from "dotenv";
import {
  createAgreement,
  executeAgreement,
  cancelAgreement,
  createPaymentWithAgreement,
  executePayment,
  queryPayment,
  searchTransaction,
  refundTransaction,
} from "bkash-payment";

import asyncHandler from "../middlewere/asyncHandler.js";
dotenv.config();

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

const bkashConfig = {
  base_url: "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
  username: "01770618567",
  password: "D7DaC<*E*eG",
  app_key: "0vWQuCRGiUX7EPVjQDr0EUAYtc",
  app_secret: "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx",
};

router.get(
  "/client-secret",
  asyncHandler(async (req, res) => {
    res.json({ clientSecret: process.env.STRIPE_PUBLISHABLE_KEY });
  })
);

router.post(
  "/create-checkout-session",
  asyncHandler(async (req, res) => {
    const { currency, productData } = req.body;

    const lineItems = productData.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.realPrice * 100,
      },
      quantity: item.quantity,
    }));

    try {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FRONTEND_BASE_URL}/stripe/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_BASE_URL}/cart/checkout`,
        client_reference_id: `${Date.now() + req.user._id}`,
        currency: currency,
      });

      res
        .status(201)
        .json({ id: session.id, status: session.status, url: session.url });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  })
);

export default router;
