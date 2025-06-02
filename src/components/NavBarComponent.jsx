import React, { useState, useEffect } from "react";
import "@/assets/styles/NavBarComponent.css";
import HeaderComponent from "./HeaderComponent.jsx";
import useUserFromToken from "../hook/useUserFromToken.js";

function NavBarComponent() {
  const [open, setOpen] = useState(false);
  const user = useUserFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/"; // Redirige al home
  };

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <HeaderComponent />
      </a>
      <button
        className="navbar-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggle-icon">&#9776;</span>
      </button>
      <ul className={`navbar-links ${open ? "active" : ""}`}>
        <li><a href="/">Inicio</a></li>
        <li><a href="/estadisticas">Estadisticas</a></li>
        {!user ? (
          <>
            <li><a href="/registro">Registro de usuario</a></li>
            <li><a href="/login">Login</a></li>
          </>
        ) : (
          <>
            <li className="navbar-user">Hola –{user.nombre || user.name || "Jugador"}–</li>
            <li><a href="/mis-mazos">Mis mazos</a></li>
            <li><a href="/editar-usuario">Editar usuario</a></li>
            <li><button onClick={handleLogout} className="navbar-logout">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBarComponent;