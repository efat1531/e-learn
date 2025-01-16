const calculateDiscountPercentageByPriceDiscount = (price, discount) => {
  const realPrice = price - discount;
  const percentage = (realPrice * 100) / price;
  return percentage.toFixed(2);
};

const calculateDiscountPercentageByPriceRealPrice = (
  discountedPrice,
  realPrice
) => {
  console.log(discountedPrice, realPrice);
  if (realPrice === discountedPrice) return 0;
  const remPrice = realPrice - discountedPrice;
  const percentage = (remPrice * 100) / realPrice;
  return percentage.toFixed(2);
};

export {
  calculateDiscountPercentageByPriceDiscount,
  calculateDiscountPercentageByPriceRealPrice,
};
