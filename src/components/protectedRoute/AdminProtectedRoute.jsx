import React from "react";
import { getCurrentUser } from "../../services/auth";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const user = getCurrentUser();

  return user.isAdmin ? <Outlet /> : <Navigate to={"/musicplayer"} />;
};

export default AdminProtectedRoute;
