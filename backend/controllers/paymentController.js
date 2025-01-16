import Stripe from "stripe";
import asyncHandler from "../middlewere/asyncHandler.js";
import orderModel from "../models/orderModel.js";
import AppError from "../utils/AppError.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import courseProgressionModel from "../models/courseProgressModel.js";
import courseModel from "../models/courseModel.js";
import axios from "axios";

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
  try {
    const { sessionID } = req.body;
    if (!sessionID) {
      throw AppError.badRequest("Session ID is required");
    }

    console.log(`Retrieving session with ID: ${sessionID}`);
    const session = await stripe.checkout.sessions.retrieve(sessionID);
    if (!session) {
      throw AppError.notFound("Session not found. Please try again.");
    }

    const orderID = session.client_reference_id;
    console.log(`Retrieving order with ID: ${orderID}`);
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
      if (!existingUser) {
        throw AppError.notFound("User not found. Please try again.");
      }

      existingUser.courses.push(
        ...existingOrder.orderItems.map((item) => item.course)
      );
      existingUser.wishList = existingUser.wishList.filter(
        (course) =>
          !existingOrder.orderItems.map((item) => item.course).includes(course)
      );
      await existingUser.save();
      await existingOrder.save();

      let listOfInstructors = [];

      for (const item of existingOrder.orderItems) {
        if (item.isCourse) {
          const course = await courseModel.findById(item.course);
          if (!course) {
            throw AppError.notFound(`Course with ID ${item.course} not found.`);
          }
          course.incrementStudents();

          const instructor = await userModel
            .findById(course.instructor)
            .select("+numberOfStudents");
          if (!instructor) {
            throw AppError.notFound(
              `Instructor with ID ${course.instructor} not found.`
            );
          }
          console.log(instructor);

          if (!listOfInstructors.includes(instructor._id)) {
            listOfInstructors.push(instructor._id);
            instructor.numberOfStudents = instructor.numberOfStudents + 1;
            await instructor.save();
          }
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
          console.log(newCourseProgress);

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
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Create payment intent for amarPay
// @route   POST /api/payment/create-payment-intent-amarPay
// @access  Private
const createPaymentIntentAmarPay = asyncHandler(async (req, res, next) => {
  const { currency, totalPrice, orderID } = req.body;
  const { email, name } = req.user;
  const phone = "01700000000";
  const description = "E-Learning Course Purchase";
  const successUrl = `${process.env.FRONTEND_BASE_URL}/stripe/payment/successful?order_id=${orderID}`;
  const cancelUrl = `${process.env.FRONTEND_BASE_URL}/`;
  const failUrl = successUrl;
  const baseUrl = process.env.AMARPAY_BASE_URL;
  const store_id = process.env.AMARPAY_STORE_ID;
  const signature_key = process.env.AMARPAY_SIGNATURE_KEY;
  const paymentIntent = {
    store_id: store_id,
    signature_key: signature_key,
    tran_id: orderID,
    amount: totalPrice,
    currency: currency,
    desc: description,
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    success_url: successUrl,
    fail_url: failUrl,
    cancel_url: cancelUrl,
    type: "json",
  };

  try {
    const response = await axios.post(`${baseUrl}/jsonpost.php`, paymentIntent);
    if (response.data.result === false) {
      const message = response.data.errors[0];
      return next(
        new AppError(
          message,
          500,
          "AmarPay Payment Failed",
          true,
          "Missing or invalid data"
        )
      );
    }
    res.status(201).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    next(new AppError("Payment intent creation failed", 500));
  }
});

// @desc   AmarPay Payment Verification
// @route  POST /api/payment/amarPay-verification
// @access Public
const amarPayVerification = asyncHandler(async (req, res) => {
  const { orderID } = req.body;
  const baseUrl = process.env.AMARPAY_BASE_URL;
  const store_id = process.env.AMARPAY_STORE_ID;
  const signature_key = process.env.AMARPAY_SIGNATURE_KEY;
  const verificationURL = `${baseUrl}/api/v1/trxcheck/request.php?request_id=${orderID}&store_id=${store_id}&signature_key=${signature_key}&type=json`;

  try {
    const response = await axios.get(verificationURL);
    const order = await orderModel.findById(orderID);
    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    // if already verified
    if (order.paymentResult.status === "paid") {
      return res.status(200).json({
        status: "success",
        data: response.data,
      });
    }

    // if not verified
    if (
      response.data.pay_status === "Successful" ||
      response.data.status_code === "2"
    ) {
      order.paymentResult = {
        transaction_id: response.data.pg_txnid,
        status: "paid",
        update_time: response.data.date,
        email_address: response.data.cus_email,
      };

      const existingUser = await userModel.findById(order.user);
      existingUser.courses.push(...order.orderItems.map((item) => item.course));

      existingUser.wishList = existingUser.wishList.filter(
        (course) =>
          !order.orderItems.map((item) => item.course).includes(course)
      );

      await existingUser.save();
      await order.save();

      let listOfInstructors = [];

      // update course students and create course progress
      for (const item of order.orderItems) {
        if (item.isCourse) {
          const course = await courseModel.findById(item.course);
          course.incrementStudents();
          const instructor = await userModel
            .findById(course.instructor)
            .select("+numberOfStudents");
          if (!listOfInstructors.includes(instructor._id)) {
            listOfInstructors.push(instructor._id);
            instructor.numberOfStudents = instructor.numberOfStudents + 1;
            await instructor.save();
          }

          const newCourseProgress = new courseProgressionModel({
            user: order.user,
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
      data: response.data,
    });
  } catch (error) {
    throw new AppError("AmarPay verification failed", 500);
  }
});

export {
  createPaymentIntentStripe,
  updatePaymentIntentStripe,
  createPaymentIntentAmarPay,
  amarPayVerification,
};
