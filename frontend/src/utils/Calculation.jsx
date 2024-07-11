const calculatedPrice = (price, discount) => {
  return price - discount;
};

const calculatePercentage = (price, discount) => {
  return (discount / price) * 100;
};

export { calculatedPrice, calculatePercentage };
