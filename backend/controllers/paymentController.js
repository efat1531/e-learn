import Stripe from "stripe";
import asyncHandler from "../middlewere/asyncHandler.js";
import orderModel from "../models/orderModel.js";
import AppError from "../utils/AppError.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import courseProgressionModel from "../models/courseProgressModel.js";
import courseModel from "../models/courseModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntentStripe = asyncHandler(async (req, res, next) => {
  const { currency, productData, orderID } = req.body;

  const courseData = productData.filter((item) => item.isCourse);

  let totalPrice = 0;

  const lineItems = await Promise.all(
    productData.map(async (item) => {
      let productData = {
        name: item.name,
      };
      let unitAmount = item.realPrice * 100;

      if (item.isCourse) {
        const course = await courseModel.findById(item.course);
        if (course) {
          productData = {
            name: course.name,
            description: course.description,
          };
          unitAmount = course.currentPrice * 100;
        }
      }

      totalPrice += unitAmount * item.quantity;

      return {
        price_data: {
          currency: currency,
          product_data: productData,
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    })
  );

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_BASE_URL}/stripe/payment/successful?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/cart/checkout`,
      client_reference_id: orderID,
    });

    await orderModel.findByIdAndUpdate(orderID, {
      paymentResult: {
        transaction_id: session.id,
        status: session.payment_status,
        update_time: session.created,
        email_address: session.customer_email,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        id: session.id,
        status: session.payment_status,
        url: session.url,
      },
    });
  } catch (error) {
    next(new AppError("Payment intent creation failed", 500));
  }
});

const updatePaymentIntentStripe = asyncHandler(async (req, res) => {
  const { sessionID } = req.body;

  const session = await stripe.checkout.sessions.retrieve(sessionID);
  if (!session) {
    throw AppError.notFound("Session not found. Please try again.");
  }

  const orderID = session.client_reference_id;

  const existingOrder = await orderModel.findById(orderID).populate({
    path: "orderItems.course",
    select: "title",
  });

  if (!existingOrder) {
    throw AppError.notFound("Order not found. Please try again.");
  }

  if (existingOrder.paymentResult.status === "paid") {
    return res.status(200).json({
      status: "success",
      data: {
        session,
      },
    });
  }

  if (session.payment_status === "paid") {
    existingOrder.paymentResult = {
      transaction_id: session.id,
      status: session.payment_status,
      update_time: session.created,
      email_address: session.customer_details.email,
    };

    const existingUser = await userModel.findById(existingOrder.user);
    existingUser.courses.push(
      ...existingOrder.orderItems.map((item) => item.course)
    );
    existingUser.wishList = existingUser.wishList.filter(
      (course) =>
        !existingOrder.orderItems.map((item) => item.course).includes(course)
    );
    await existingUser.save();
    await existingOrder.save();

    for (const item of existingOrder.orderItems) {
      if (item.isCourse) {
        const course = await courseModel.findById(item.course);
        course.incrementStudents();

        const newCourseProgress = new courseProgressionModel({
          user: existingOrder.user,
          course: item.course,
          courseContent: course.courseContent.map((section) => ({
            sectionTitle: section.sectionTitle,
            sectionContainer: section.sectionContainer.map((contentId) => ({
              content_id: contentId,
              isCompleted: false,
            })),
          })),
          completed: false,
        });

        await newCourseProgress.save();
      }
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      order: existingOrder,
      session: session,
    },
  });
});

export { createPaymentIntentStripe, updatePaymentIntentStripe };
