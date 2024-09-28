import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number },
        discount: { type: Number },
        quantity: { type: Number },
        isCourse: { type: Boolean },
        deliveryStatus: { type: String },
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    paymentMethod: {
      type: String,
    },
    paymentResult: {
      transaction_id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
