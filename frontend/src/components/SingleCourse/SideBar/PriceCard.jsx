import CountDownTimer from "../../ui/CountDownTimer";
import React, { useState } from "react";
import { LuClock } from "react-icons/lu";
import { useSelector } from "react-redux";
import { CURRENCY_SYMBOL } from "../../../utils/Static_Currency_Variables.js";

const PriceCard = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  const {currency} = useSelector((state) => state.auth);
  const [discountState, setDiscountState] = useState(0);

  if (!selectedCourse) return null;

  const currencySymbol = CURRENCY_SYMBOL(currency);

  const { price, discountExpires, currentPrice } = selectedCourse;
  const endTime = new Date(discountExpires).getTime();

  const percentage = ((price - currentPrice) * 100) / price;
  if (currentPrice !== price) {
    setDiscountState(1);
  }

  const onEndTimer = () => {
    setDiscountState(0);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex w-[23.5rem] justify-between items-center">
        <div className="flex justify-between items-start">
          <div className="flex justify-center items-center gap-2">
            {discountState > 0 && (
              <div className="text-gray-900 font-inter font-normal text-2xl leading-8">
                {currencySymbol}&nbsp;{currentPrice.toFixed(2)}
              </div>
            )}
            <div
              className={`font-inter font-normal leading-8 ${
                discountState > 0
                  ? "text-gray-400 line-through font-xl"
                  : "text-Primary-500 text-2xl"
              }`}
            >
              {currencySymbol}&nbsp;{price.toFixed(2)}
            </div>
          </div>
        </div>
        {discountState > 0 && (
          <div className="flex justify-center items-center gap-2.5 bg-orange-100 p-2">
            <div className="text-Primary-500 uppercase font-inter font-medium text-base leading-none">
              {Math.round(percentage)}%&nbsp;off
            </div>
          </div>
        )}
      </div>

      {discountState > 0 && (
        <div className="flex justify-center items-center gap-2">
          <LuClock className="text-red-500 text-[1.25rem] animate-spin" />
          <div className="flex items-center text-red-500 font-inter font-medium text-[0.9rem] leading-5 tracking-tight">
            <CountDownTimer endTime={endTime} onFinishFunction={onEndTimer} />
            <div>&nbsp;in this price!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCard;
