import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { calculateDiscountPercentageByPriceRealPrice } from "../../utils/Calculation.js";
import Button from "../ui/Button";
import { useCreateStripePaymentSessionMutation } from "../../features/api/paymentApiSlice";
import { useCreateOrderMutation } from "../../features/api/orderApiSlice.js";
import CardPaymentHandler from "./cardPaymentHandler.js";

const CartInfo = ({ paymentBy, userEmail = "" }) => {
  const { orderDetails } = useSelector((state) => state.order);
  const userID = useSelector((state) => state.auth.id);
  const [createPaymentStripe] = useCreateStripePaymentSessionMutation();
  const [createOrder] = useCreateOrderMutation();

  if (!orderDetails || !userID) return null;
  const { totalPrice, currency, productData, subTotal } = orderDetails;

  const courseItems = productData.filter((item) => item.isCourse);
  const nonCourseItems = productData.filter((item) => !item.isCourse);

  const numberOfCourses = courseItems.length;
  const numberOfItems = nonCourseItems.length;

  const handleCheckout = () => {
    if (paymentBy === "card") {
      const cardPaymentHandler = new CardPaymentHandler();
      cardPaymentHandler.processPayment({
        orderDetails,
        currency,
        productData,
        createOrder,
        createPaymentStripe,
      });
    }
  };

  // const checkoutHandler = async () => {
  //   if (paymentBy === "card") {
  //     const toastID = toastManager.loading("Processing payment");
  //     try {
  //       const { data: orderData } = await createOrder({
  //         ...orderDetails,
  //         paymentMethod: paymentBy,
  //       }).unwrap();

  //       const { data: paymentData } = await createPaymentStripe({
  //         currency,
  //         productData,
  //         orderID: orderData._id,
  //       }).unwrap();

  //       toastManager.updateStatus(toastID, {
  //         render: "Order created successfully",
  //         type: "success",
  //       });

  //       setTimeout(() => {
  //         window.location.href = paymentData.url;
  //       }, 2000);
  //     } catch (error) {
  //       toastManager.updateStatus(toastID, {
  //         render:
  //           error?.data?.message ??
  //           error?.message ??
  //           "Failed to process payment",
  //         type: "error",
  //       });
  //     }
  //   }
  // };

  return (
    <div className="py-6 flex flex-col items-center gap-6 border-CustomGray-100 border">
      {numberOfCourses > 0 && (
        <div className="flex flex-col items-start gap-4 px-5">
          <div className="w-30.5rem text-CustomGray-900 text-lg font-[500]">
            {`Course ${
              numberOfCourses < 10 ? `0${numberOfCourses}` : numberOfCourses
            }`}
          </div>
          {courseItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 w-full">
              <img
                src={item.image}
                alt="course"
                className="w-[6.25rem] h-[4.6875rem] object-cover"
              />
              <div className="flex w-full items-start flex-col gap-3">
                <div className="flex w-full flex-col items-start gap-[0.312rem]">
                  <div className="flex items-start gap[0.375rem]">
                    <div className="text-xs text-CustomGray-400">
                      Course By,&nbsp;
                    </div>
                    <div className="text-CustomGray-700 text-xs">
                      {item.courseCreator}
                    </div>
                  </div>
                  <div className="w-full text-sm text-CustomGray-900">
                    {item.name}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-Primary-500 text-sm font-[500]">
                    {item.realPrice}
                  </div>
                  {item.realPrice !== item.price && (
                    <div className="text-CustomGray-400 text-sm line-through">
                      {item.price}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {numberOfItems > 0 && (
        <div className="flex flex-col items-start gap-4 px-5">
          <div className="w-30.5rem text-CustomGray-900 text-lg font-[500]">
            `Products ($
            {numberOfCourses < 10 ? `0${numberOfCourses}` : numberOfCourses})`
          </div>
          {courseItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 w-full">
              <img
                src={item.image}
                alt="product"
                className="w-[6.25rem] h-[4.6875rem] object-cover"
              />
              <div className="flex w-full items-start flex-col gap-3">
                <div className="flex w-full flex-col items-start gap-[0.312rem]">
                  <div className="w-full text-sm text-CustomGray-900">
                    {item.name}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-Primary-500 text-sm font-[500]">
                    {item.realPrice}
                  </div>
                  {item.realPrice !== item.price && (
                    <div className="text-CustomGray-400 text-sm line-through">
                      {item.price}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="h-[0.0625rem] bg-[#E9EAF0] w-full"></div>
      <div className="flex flex-col items-start gap-4 px-5 w-full">
        <div className="text-[1.125rem] leading-6 font-[500] text-CustomGray-900 w-full">
          Order Summary
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-CustomGray-600">Subtotal</div>
            <div className="text-sm text-CustomGray-900 font-[500]">
              {subTotal}&nbsp;{currency === "bdt" ? "BDT" : "USD"}
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-CustomGray-600 text-sm">Discount</div>
            <div className="text-sm text-CustomGray-900 font-[500]">
              {calculateDiscountPercentageByPriceRealPrice(
                totalPrice,
                subTotal
              )}
              &nbsp;{"%"}
            </div>
          </div>
        </div>
        <div className="bg-[#E9EAF0] h-[0.0625rem] w-full"></div>
        <div className="flex w-full justify-between items-center">
          <div className="text-[#202029] text-right text-[1rem] leading-6">
            Total:
          </div>
          <div className="text-[#202029] text-right text-2xl font-semibold">
            {totalPrice}&nbsp;{currency === "bdt" ? "BDT" : "USD"}
          </div>
        </div>
      </div>
      <div className="w-full px-5">
        <Button
          title="Complete Payment"
          className={"w-full "}
          onClick={handleCheckout}
        />
      </div>
    </div>
  );
};

CartInfo.propTypes = {
  paymentBy: PropTypes.string.isRequired,
  userEmail: PropTypes.string,
};

export default CartInfo;
