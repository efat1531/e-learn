import corn from "node-cron";
import courseModel from "../models/courseModel.js";

corn.schedule("0 0 * * *", async () => {
  try {
    const courses = await courseModel.find();
    for (const course of courses) {
      if (!course.discountExpires || course.discountExpires < Date.now()) {
        course.currentPrice = course.price;
      } else {
        course.currentPrice = course.price - course.discount;
      }
      await course.save();
    }
    console.log("Updated currentPrice for expired discounts");
  } catch (error) {
    console.error("Error updating currentPrice for expired discounts:", error);
  }
});

export default corn;
