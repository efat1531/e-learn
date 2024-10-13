import React from "react";
import DesktopNavMin from "./Navbar/DesktopNavMin";
import Footer from "./Footer";

const LayoutMin = ({ children }) => {
  return (
    <div>
      <DesktopNavMin />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutMin;
