import React, { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { FaHandshake } from "react-icons/fa";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { LiaAmazonPay } from "react-icons/lia";
// import Bkash from "../../assets/Icon/Bkash";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function PaymentMethods({ paymentBy, setPaymentBy, userEmail, setUserEmail }) {
  const { role } = useSelector((state) => state.auth);

  // On change handler for input field
  const onChangeHandler = (e) => {
    setUserEmail(e.target.value.trim());
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="text-CustomGray-900 text-[2rem] font-semibold leading-10 tracking-tight">
        Payment Methods
      </div>
      <div className="flex flex-col w-full gap-6">
        {/* Stripe Payment */}
        <div
          className={`flex w-full px-6 py-[0.875rem] border rounded-sm items-center ${
            paymentBy === "card"
              ? "border-Success-500 bg-CustomGray-50"
              : "border-CustomGray-300"
          }`}
          onClick={() => setPaymentBy("card")}
        >
          <div className={` w-full flex gap-6 items-center `}>
            <CiCreditCard1 className="text-[2rem] text-Primary-500" />
            <div className="text-CustomGray-700 text-sm w-[20rem]">
              Payment by Card
            </div>
          </div>
          {paymentBy === "card" && (
            <RiCheckboxCircleFill className="text-Success-500 text-[1.5rem] " />
          )}
        </div>
        {/* Bkash Payment */}
        {/* <div
          className={`flex w-full px-6 py-[0.875rem] border rounded-sm items-center ${
            paymentBy === "bkash"
              ? "border-Success-500 bg-CustomGray-50"
              : "border-CustomGray-300"
          }`}
          onClick={() => setPaymentBy("bkash")}
        >
          <div className={` w-full flex gap-6 items-center `}>
            <Bkash />
            <div className="text-CustomGray-700 text-sm w-[20rem]">
              Payment by Bkash
            </div>
          </div>
          {paymentBy === "bkash" && (
            <RiCheckboxCircleFill className="text-Success-500 text-[1.5rem] " />
          )}
        </div> */}
        {/* AmarPay Payment */}
        <div
          className={`flex w-full px-6 py-[0.875rem] border rounded-sm items-center ${
            paymentBy === "amarPay"
              ? "border-Success-500 bg-CustomGray-50"
              : "border-CustomGray-300"
          }`}
          onClick={() => setPaymentBy("amarPay")}
        >
          <div className={` w-full flex gap-6 items-center `}>
            <LiaAmazonPay className="text-[2rem] text-yellow-500" />
            <div className="text-CustomGray-700 text-sm w-[20rem]">
              Payment by AmarPay
            </div>
          </div>
          {paymentBy === "amarPay" && (
            <RiCheckboxCircleFill className="text-Success-500 text-[1.5rem] " />
          )}
        </div>
        {/* Cash Payment - Only visible to Admin */}
        {role === "admin" && (
          <div
            className={`flex w-full px-6 py-[0.875rem] border rounded-sm items-center ${
              paymentBy === "cash"
                ? "border-Success-500 bg-CustomGray-50"
                : "border-CustomGray-300"
            }`}
            onClick={() => setPaymentBy("cash")}
          >
            <div className={` w-full flex gap-6 items-center `}>
              <FaHandshake className="text-[2rem] text-Secondary-400" />
              <div className="text-CustomGray-700 text-sm w-[20rem]">
                Payment by Cash
              </div>
            </div>
            {paymentBy === "cash" && (
              <RiCheckboxCircleFill className="text-Success-500 text-[1.5rem] " />
            )}
          </div>
        )}
        {paymentBy === "cash" && role === "admin" && (
          <div>
            <div className="flex flex-col items-start gap-6">
              <div className="grid gap-2 w-full">
                <label htmlFor="userEmail">User Email</label>
                <div className="relative">
                  <MdEmail
                    className={`absolute top-1/2 left-3 transform -translate-y-1/2 text-xl ${
                      isValidEmail(userEmail)
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                  <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={userEmail}
                    onChange={onChangeHandler}
                    className={`pl-10 pr-4 py-2 bg-white border w-full focus:outline-none text-gray-500 font-inter text-sm font-normal leading-6 ${
                      isValidEmail(userEmail)
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

PaymentMethods.propTypes = {
  paymentBy: PropTypes.string.isRequired,
  setPaymentBy: PropTypes.func.isRequired,
};

export default PaymentMethods;
