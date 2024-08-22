import orderModel from "../models/orderModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";
import courseProgressModel from "../models/courseProgressModel.js";
import AppError from "../utils/AppError.js";

// @desc    Create new order
// @route   POST /api/order/
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { productsData, totalPrice, paymentMethod } = req.body;

  const orderItems = productsData.map((item) => ({
    name: item.name,
    price: item.price,
    discount: item.discount,
    quantity: item.quantity,
    isCourse: item.isCourse,
    deliveryStatus: "pending",
    course: item.course,
  }));

  // Check if user has already purchased the course
  const courseIds = orderItems
    .filter((item) => item.isCourse)
    .map((item) => item.course);

  const hasBrought = req.user.courses.some((course) =>
    courseIds.includes(course)
  );

  if (hasBrought) {
    throw new AppError.badRequest("You have already purchased this course");
  }

  const paymentResult = {
    status: "unpaid",
    update_time: new Date().toISOString(),
  };

  const order = await orderModel.create({
    user,
    orderItems,
    totalPrice,
    paymentMethod,
    paymentResult,
  });

  res.status(201).json({
    status: "success",
    data: order,
  });
});

export { createOrder };
