import orderModel from "../models/orderModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";
import courseProgressModel from "../models/courseProgressModel.js";
import AppError from "../utils/AppError.js";
import { areFieldsValid } from "../utils/nullValueCheck.js";

// @desc    Create new order
// @route   POST /api/order/
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { productData, totalPrice, paymentMethod } = req.body;

  const requiredFields = ["productData", "totalPrice", "paymentMethod"];
  if (!areFieldsValid(req.body, requiredFields)) {
    throw AppError.badRequest("Please provide all required fields");
  }

  const orderItems = productData.map((item) => ({
    name: item.name,
    price: item.price,
    discount: item.discount,
    quantity: item.quantity,
    isCourse: item.isCourse,
    deliveryStatus: "pending",
    course: item.isCourse ? item.id : null,
  }));

  // Check if user has already purchased the course
  const courseIds = orderItems
    .filter((item) => item.isCourse)
    .map((item) => item.course);

  const hasBrought = req.user.courses.some((course) =>
    courseIds.includes(course)
  );

  if (hasBrought) {
    throw AppError.badRequest("You have already purchased this course");
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

// @desc   Get All Orders
// @route  GET /api/order/
// @access Private[Admin, User]
const getAllOrders = asyncHandler(async (req, res) => {
  const filter = {};

  if(req.role !== "admin"){
    filter.user = req.user._id;
  }
  const totalOrders = await orderModel.countDocuments(filter);
  const orders = await orderModel.find(filter).populate({
    path: "orderItems.course",
    select: "title instructor",
    populate: {
      path: "instructor",
      select: "name",
    },
  });

  res.status(200).json({
    status: "success",
    totalOrders,
    data: orders,
  });
})

export { createOrder, getAllOrders };
