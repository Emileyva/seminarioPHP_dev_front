import React from "react";
import { Navigate } from "react-router-dom";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el token
    const isExpired = payload.exp * 1000 < Date.now(); // Verifica si está expirado
    return !isExpired;
  } catch (error) {
    return false; // Si hay un error, el token no es válido
  }
};

const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;