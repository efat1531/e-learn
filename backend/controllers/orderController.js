import orderModel from "../models/orderModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { areFieldsValid } from "../utils/nullValueCheck.js";
import DynamicFilter from "../utils/dynamicFilter.js";
import DynamicSort from "../utils/dynamicSort.js";

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
    .map((item) => item.course.toString());

  const hasBrought = req.user.courses.some((course) =>
    courseIds.includes(course.toString())
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

  if (req.role !== "admin") {
    filter.user = req.user._id;
  }

  const totalOrders = await orderModel.countDocuments(filter);
  const orders = await orderModel
    .find(filter)
    .populate({
      path: "orderItems.course",
      select: "title instructor titleImage",
      populate: {
        path: "instructor",
        select: "name",
      },
    })
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    totalOrders,
    data: orders,
  });
});

// @desc    Get order by ID
// @route   GET /api/order/:id
// @access  Private[Admin, User]
const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id).populate({
    path: "orderItems.course",
    select: "title instructor titleImage",
    populate: {
      path: "instructor",
      select: "name",
    },
  });

  if (!order) {
    throw AppError.notFound("Order not found");
  }

  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw AppError.forbidden("You are not authorized to view this order");
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

// @desc    Fetch Order by Session ID
// @route   GET /api/order/payment/:id
// @access  Private[Admin, User]
const getOrderByPaymentID = asyncHandler(async (req, res) => {
  const order = await orderModel
    .findOne({
      "paymentResult.transaction_id": req.params.id,
    })
    .populate({
      path: "orderItems.course",
      select: "title instructor titleImage",
      populate: {
        path: "instructor",
        select: "name",
      },
    });

  if (!order) {
    throw AppError.notFound("Order not found");
  }

  const subTotal = order.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderObject = order.toObject();
  orderObject.subTotal = subTotal;

  res.status(200).json({
    status: "success",
    data: orderObject,
  });
});

// @desc  Delete Order
// @route DELETE /api/order/:id
// @access Private[Admin], User
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    throw AppError.notFound("Order not found");
  }

  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw AppError.forbidden("You are not authorized to delete this order");
  }

  if (order.paymentResult.status === "paid") {
    throw AppError.badRequest("You can't delete a paid order");
  }

  await orderModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Order deleted successfully",
  });
});

export {
  createOrder,
  getOrderById,
  getOrderByPaymentID,
  getAllOrders,
  deleteOrder,
};
