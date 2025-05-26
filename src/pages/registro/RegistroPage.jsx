import React, { useState } from "react";
import { registrarUsuario } from "@/controllers/RegistroController";

const RegistroPage = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const validateForm = async () => {
    const newErrors = [];

    // Validar usuario
    if (formData.usuario.length < 6 || formData.usuario.length > 20) {
      newErrors.push("El usuario debe tener entre 6 y 20 caracteres.");
    }
    if (!/^[a-zA-Z0-9]+$/.test(formData.usuario)) {
      newErrors.push("El usuario debe ser alfanumérico.");
    }
    // Simular verificación de usuario único (puedes reemplazar con una llamada al backend)
    // const usuarioEnUso = await verificarUsuarioEnUso(formData.usuario);
    // if (usuarioEnUso) {
    //   newErrors.push("El usuario ya está en uso.");
    // }}

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

  const verificarUsuarioEnUso = async (usuario) => {
    // Simulación de verificación (reemplaza con una llamada al backend)
    const usuariosExistentes = ["usuario1", "usuario2", "usuario3"];
    return usuariosExistentes.includes(usuario);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess(false);
  const isValid = await validateForm();
  if (isValid) {
    const response = await registrarUsuario(formData);
    console.log("Respuesta procesada:", response); // Depuración
    if (response.error) {
      setErrors([response.error]); // Muestra el error del backend
    } else {
      setSuccess(true); // Registro exitoso
      setFormData({ usuario: "", nombre: "", password: "" }); // Limpia el formulario
    }
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

      {success && (
        <div style={{ color: "green" }}>
          <h3>Registro exitoso</h3>
          <p>¡El usuario se ha registrado correctamente!</p>
        </div>
      )}
    </div>
  );
};

export default RegistroPage;