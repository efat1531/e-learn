import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastManager } from "./ui/toastGeneral";
import PropTypes from "prop-types";

function PrivateRoute({ allowedRoles = [] }) {
  const { authenticated, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      toastManager.error("You need to login to view this page.");
      navigate("/login");
    }
  }, [authenticated, navigate]);

  if (allowedRoles.length > 0 && allowedRoles.includes(role)) {
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
