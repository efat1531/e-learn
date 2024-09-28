import React from "react";
import DesktopNavMin from "./Navbar/DesktopNavMin";

const LayoutMin = ({ children }) => {
  return (
    <div>
      <DesktopNavMin />
      {children}
    </div>
  );
};

export default LayoutMin;
