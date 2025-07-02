import React, { useState } from "react";
import NavBarComponent from "./NavBarComponent";
import FooterComponent from "./FooterComponent";
import "@/assets/styles/Layout.css";

function Layout({ children }) {

  return (
    <div className="layout">
      <NavBarComponent />
      <main className="main-content">
        {children}
      </main>
      <FooterComponent />
    </div>
  );
}

export default Layout;