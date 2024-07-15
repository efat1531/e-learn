import orderModel from "../models/orderModel.js";
import asyncHandler from "../middlewere/asyncHandler.js";
import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";
import courseProgressModel from "../models/courseProgressModel.js";

// @desc    Create new order
// @route   POST /api/order/create-order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const userData = req.user;
  const paymentInfo = req.body.paymentInfo;

  // Check if any user already used the payment session
  const orderExists = await orderModel.findOne({
    "paymentResult.transaction_id": paymentInfo.sessionId,
  });

  if (orderExists) {
    res.status(400);
    throw new Error("Payment session already used");
  }

  const productDetails = req.body.orderDetails.productData.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      discount: item.discount,
      quantity: item.quantity,
      isCourse: item.isCourse,
      deliveryStatus: item.isCourse ? undefined : "Not Delivered",
    };
  });

  const user = await userModel.findById(userData._id);

  const courseIds = productDetails
    .filter((item) => item.isCourse)
    .map((course) => course.id);

  courseIds.forEach((courseId) => {
    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
    }
  });

  await user.save();

  const courseItems = productDetails.filter((item) => item.isCourse);

  courseItems.map(async (item) => {
    const course = await courseModel.findById(item.id).populate({
      path: "courseContent.sectionContainer",
      select: "contentType",
    });

    const courseContentProgress = await course.courseContent.map((section) => ({
      sectionTitle: section.sectionTitle,
      sectionContainer: section.sectionContainer.map((item2) => ({
        content_id: item2._id,
        isCompleted: item2.contentType === "video" ? false : undefined,
      })),
    }));

    const courseProgress = await courseProgressModel.create({
      user: userData._id,
      course: item.id,
      courseContent: courseContentProgress,
    });
  });

  const order = await orderModel.create({
    user: userData._id,
    orderItems: productDetails,
    paymentMethod: paymentInfo.paymentMethod,
    totalPrice: req.body.orderDetails.totalPrice,

    paymentResult: {
      transaction_id: paymentInfo.sessionId,
      status: "success",
      update_time: new Date(),
      email_address: userData.email,
    },
  });

  res.status(201).json({
    data: order,
  });
});

export { createOrder };
