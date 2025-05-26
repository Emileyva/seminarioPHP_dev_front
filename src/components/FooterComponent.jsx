import React from "react";
import "@/assets/styles/FooterComponent.css";

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-nav">
        <a href="/">Inicio</a>
        <a href="/proyectos">Proyectos</a>
        <a href="/registro">Registro</a>
        <a href="/login">Login</a>
      </div>
      <div className="footer-info">
        <span>Integrantes: Pereyra Josefina, Hiriart Nahuel, Leyva Gallarati Emiliano</span>
        <span>© {new Date().getFullYear()} Pokebattle</span>
      </div>
    </footer>
  );
}

export default FooterComponent;