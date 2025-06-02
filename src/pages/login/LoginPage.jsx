import React, { useState } from "react";
import { loginService } from "@/services/loginServices";

const LoginPage = () => {
  const [loginData, setloginData] = useState({
    usuario: "",
    nombre: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  // Validación simple: que no esté vacío cada campo
  const validateForm = () => {
    const newErrors = [];
    if (!loginData.usuario.trim()) newErrors.push("El usuario es requerido.");
    if (!loginData.nombre.trim()) newErrors.push("El nombre es requerido.");
    if (!loginData.password.trim()) newErrors.push("La contraseña es requerida.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrors([]);
    
    if (!validateForm()) return;

    const response = await loginService(loginData);
    console.log("Respuesta procesada:", response); // Para depuración

    if (response.error) {
      setErrors([response.error]);
    } else {
      setSuccess(true);
      // Redirigir o realizar otra acción al tener éxito en el login
    }
  };

  const handleChange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={loginData.usuario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={loginData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>

      {errors.length > 0 && (
        <div style={{ color: "red" }}>
          <h3>Errores:</h3>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {success && (
        <div style={{ color: "green" }}>
          <h3>Inicio de sesión exitoso</h3>
          <p>Se guardaron los datos del usuario y el token.</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;