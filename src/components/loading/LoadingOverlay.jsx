import React from "react";
import "@/assets/styles/LoadingOverlay.css";

function LoadingOverlay({ loading }) {
  if (!loading) return null;
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <span className="loading-text">Cargando...</span>
    </div>
  );
}

export default LoadingOverlay;