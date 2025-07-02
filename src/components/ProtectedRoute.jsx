import React from "react";
import { Navigate } from "react-router-dom";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    return !isExpired;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;