import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUpdateStripePaymentSessionMutation } from "../features/api/paymentApiSlice";
import { toastManager } from "../components/ui/toastGeneral";
import { calculateDiscountPercentageByPriceRealPrice } from "../utils/Calculation.js";

// Lazy load components
const PageHeader = lazy(() => import("../components/Common/PageHeader"));
const Button = lazy(() => import("../components/ui/Button"));

const breadcrumb = [
  {
    name: "Home /",
    link: "/",
  },
  {
    name: " Cart / ",
    link: "/cart ",
  },
  {
    name: "Payment",
    link: null,
  },
];

function Stripe_Successful() {
  const { orderDetails } = useSelector((state) => state.order);
  const [orderID, setOrderID] = useState();
  const hasEffectRun = useRef(false);
  const [searchParams] = useSearchParams();

  const sessionID = searchParams.get("session_id");
  const [updateStripePayment] = useUpdateStripePaymentSessionMutation();

  const updateStripePaymentSession = async () => {
    const toastId = toastManager.loading("Processing payment...");
    try {
      const body = { sessionID };
      const { data } = await updateStripePayment(body).unwrap();
      const { session } = data;
      setOrderID(session.client_reference_id);
      toastManager.updateStatus(toastId, {
        render: "Payment successful",
        type: "success",
      });
    } catch (error) {
      const errorMessage =
        error?.data?.message ?? error?.message ?? "Something went wrong";
      toastManager.updateStatus(toastId, {
        render: errorMessage,
        type: "error",
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!hasEffectRun.current) {
      hasEffectRun.current = true;
      updateStripePaymentSession();
    }
  }, []);

  const handleGoToHomeButton = () => {
    navigate("/");
  };

  if (!orderDetails) {
    return (
      <div className="text-[1.125rem] leading-6 font-[500] text-CustomGray-900 py-20 text-center w-full">
        No order found. Please create an order.
      </div>
    );
  }

  const { totalPrice, currency, productData, subTotal } = orderDetails;
  const courseItems = productData.filter((item) => item.isCourse);
  const nonCourseItems = productData.filter((item) => !item.isCourse);

  const numberOfCourses = courseItems.length;
  const numberOfItems = nonCourseItems.length;

  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading Page Header...</div>}>
        <PageHeader title="Payment Successful" breadcrumb={breadcrumb} />
      </Suspense>
      <div className="py-20 max-w-[30rem] mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col pb-6 gap-2">
            <div className="text-[1.125rem] leading-6 font-[500] text-CustomGray-900">
              Thank you for your purchase
            </div>
            <div className="text-sm text-CustomGray-700">
              Here is a little summary of your purchase.
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm">Order ID:</div>
              <div className="text-[1rem] leading-6 text-gray-800 font-[600]">
                {orderID}
              </div>
            </div>
          </div>
        </div>
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
                {numberOfCourses < 10 ? `0${numberOfCourses}` : numberOfCourses}
                )`
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
            <Suspense fallback={<div>Loading Button...</div>}>
              <Button
                title="Go Home"
                className={"w-full "}
                onClick={handleGoToHomeButton}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stripe_Successful;
