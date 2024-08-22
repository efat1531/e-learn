import Stripe from "stripe";
import asyncHandler from "../middlewere/asyncHandler.js";
import orderModel from "../models/orderModel.js";
import AppError from "../utils/AppError.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntentStripe = asyncHandler(async (req, res) => {
  const { currency, productData, orderID } = req.body;

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

  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_BASE_URL}/stripe/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_BASE_URL}/cart/checkout`,
    client_reference_id: orderID,
    currency: currency,
  });

  await orderModel.findByIdAndUpdate(orderID, {
    paymentResult: {
      transaction_id: session.id,
      status: session.status,
      update_time: session.payment_intent.created,
      email_address: session.customer_email,
    },
  });

  res
    .status(201)
    .json({ id: session.id, status: session.status, url: session.url });
});

const updatePaymentIntentStripe = asyncHandler(async (req, res) => {
  const { orderID } = req.body;
  if (!orderID) {
    throw new AppError.badRequest("No order ID provided. Please try again.");
  }

  const order = await orderModel.findById(orderID);
  if (!order) {
    throw new AppError.notFound("Order not found. Please try again.");
  }

  const sessionID = order.paymentResult.transaction_id;
  const session = await stripeClient.checkout.sessions.retrieve(sessionID);
  if (!session) {
    throw new AppError.notFound("Session not found. Please try again.");
  }

  if (session.payment_status === "paid") {
    await orderModel.findByIdAndUpdate(orderID, {
      paymentResult: {
        transaction_id: session.id,
        status: session.payment_status,
        update_time: session.payment_intent.created,
        email_address: session.customer_email,
      },
    });
  }
});

export { createPaymentIntentStripe, updatePaymentIntentStripe };
