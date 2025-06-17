import React, { useState } from "react";
import { registrarUsuario } from "@/services/RegistroService";
import { notifySuccess, notifyError } from "@/components/Notificaciones";
import { useNavigate } from "react-router-dom";

const RegistroPage = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateForm = async () => {
    const newErrors = [];

    // Validar usuario
    if (formData.usuario.length < 6 || formData.usuario.length > 20) {
      newErrors.push("El usuario debe tener entre 6 y 20 caracteres.");
    }
    if (!/^[a-zA-Z0-9]+$/.test(formData.usuario)) {
      newErrors.push("El usuario debe ser alfanumérico.");
    }

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.push("El nombre no puede estar vacío.");
    }
    if (formData.nombre.length > 30) {
      newErrors.push("El nombre no puede tener más de 30 caracteres.");
    }

    // Validar contraseña
    if (formData.password.length < 8) {
      newErrors.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(formData.password)) {
      newErrors.push("La contraseña debe tener al menos una letra mayúscula.");
    }
    if (!/[a-z]/.test(formData.password)) {
      newErrors.push("La contraseña debe tener al menos una letra minúscula.");
    }
    if (!/[0-9]/.test(formData.password)) {
      newErrors.push("La contraseña debe tener al menos un número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.push("La contraseña debe tener al menos un carácter especial.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const isValid = await validateForm();
    if (isValid) {
      const response = await registrarUsuario(formData);
      console.log("Respuesta procesada:", response); // Depuración
      if (response.error) {
        setErrors([response.error]); // Muestra el error del backend
        notifyError(response.error);
      } else {
        notifySuccess("Registro exitoso. Redirigiendo a la página de inicio de sesión...");
        setFormData({ usuario: "", nombre: "", password: "" }); // Limpia el formulario
        setTimeout(() => navigate("/login"), 3000); // Redirige después de 3 segundos
      }
    } else {
      notifyError("Por favor, corrige los errores en el formulario.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre Público:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrarse</button>
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
    </div>
  );
};

export default RegistroPage;