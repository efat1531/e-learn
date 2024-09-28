import React from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { RiCheckboxCircleFill } from "react-icons/ri";
import Bkash from "../../assets/Icon/Bkash";
import PropTypes from "prop-types";

function PaymentMethods({ paymentBy, setPaymentBy }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-CustomGray-900 text-[2rem] font-semibold leading-10 tracking-tight">
        Payment Methods
      </div>
      <div className="flex flex-col w-full gap-6">
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
        <div
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
        </div>
      </div>
    </div>
  );
}

PaymentMethods.propTypes = {
  paymentBy: PropTypes.string.isRequired,
  setPaymentBy: PropTypes.func.isRequired,
};

export default PaymentMethods;
