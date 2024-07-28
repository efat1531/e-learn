import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastManager } from "./ui/toastGeneral";
import PropTypes from "prop-types";

function PrivateRoute({ allowedRoles = [] }) {
  const auth = true;
  const navigate = useNavigate();

  if (auth) {
    toastManager.error("Please login to access this page");
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0) {
    toastManager.error("You are forbidden to view this page.");
    navigate(-1);
    return null;
  }

  return <Outlet />;
}

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.array,
};

export default PrivateRoute;
