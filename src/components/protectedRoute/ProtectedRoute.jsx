import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const isToken = localStorage.getItem("user");
    if (isToken) {
      setToken(isToken);
    }
  }, []);
  console.log(token);
  if (token == null) {
    return null;
  }
  console.log(token);
  return token != null ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
