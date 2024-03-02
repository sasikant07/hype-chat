import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { myInfo } = useSelector((state) => state.auth);

  if (myInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/messenger/login" replace={true} />;
  }
};

export default ProtectedRoute;
