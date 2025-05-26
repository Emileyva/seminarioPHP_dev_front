import React, { useState } from "react";
import NavBarComponent from "./NavBarComponent";
import FooterComponent from "./FooterComponent";
import LoadingOverlay from "./loading/LoadingOverlay";
import "@/assets/styles/Layout.css"; // Asegúrate de tener este archivo CSS

function Layout({ children }) {
  // Simula loading, reemplaza con tu lógica real
  const [loading, setLoading] = useState(false);

  return (
    <div className="layout">
      <NavBarComponent />
      <LoadingOverlay loading={loading} />
      <main className="main-content">
        {children}
      </main>
      <FooterComponent />
    </div>
  );
}

export default Layout;