import React, { useEffect, useState } from "react";
import "@/assets/styles/NavBarComponent.css";
import HeaderComponent from "./HeaderComponent.jsx";

function NavBarComponent() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    
    window.location.href = "/login";
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
            <li className="navbar-user">Hola -{user.nombre || user.name || "Jugador"}-</li>
            <li><a href="/mis-mazos">Mis mazos</a></li>
            <li><a href="/editar-usuario">Editar usuario</a></li>
            <li><a onClick={handleLogout} className="navbar-logout">Logout</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBarComponent;