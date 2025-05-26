import React from "react";
import "@/assets/styles/HeaderComponent.css";

function HeaderComponent() {
  return (
    <header className="header">
      <img
        src="/favicon.svg"
        alt="Pokebattle Favicon"
        className="header-favicon"
      />
      <span className="header-title">Pokebattle</span>
    </header>
  );
}

export default HeaderComponent;