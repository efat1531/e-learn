import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastManager } from "./ui/toastGeneral";

function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    toastManager.error("Please login to access this page");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
