import Stripe from "stripe";
import express from "express";
import asyncHandler from "../middlewere/asyncHandler";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.get(
  "/client-secret",
  asyncHandler(async (req, res) => {
    res.json({ clientSecret: process.env.STRIPE_PUBLISHABLE_KEY });
  })
);

router.post(
  "/create-checkout-session",
  asyncHandler(async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      currency: "bdt",
      line_items: req.body.lineItems,
      success_url: `${process.env.BASE_URL}/home`,
      cancel_url: `${process.env.BASE_URL}/cart/checkout`,
      customer_email: req.user.email,
      invoice_creation: true,
      client_reference_id: req.user._id,
    });
  })
);
