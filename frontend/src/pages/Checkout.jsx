import React, { useState } from "react";
import PageHeader from "../components/Common/PageHeader";
import { useSelector } from "react-redux";
import PaymentMethods from "../components/Checkout/PaymentMethods";
import CartInfo from "../components/Checkout/CartInfo";

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
    name: "Checkout",
    link: null,
  },
];

function Checkout() {
  const [paymentBy, setPaymentBy] = useState("card");

  return (
    <div>
      <PageHeader title="Checkout" breadcrumb={breadcrumb} />
      <div className="flex py-24 flex-col lg:flex-row gap-12 w-full justify-center items-center">
        <PaymentMethods paymentBy={paymentBy} setPaymentBy={setPaymentBy} />
        <CartInfo paymentBy={paymentBy} />
      </div>
    </div>
  );
}

export default Checkout;
