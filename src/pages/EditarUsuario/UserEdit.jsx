import React, { useState } from "react";
import { actualizarUsuario } from "@/services/UserEditServices";
import { notifySuccess, notifyError } from "@/components/Notificaciones";
import { useNavigate } from "react-router-dom";

const EditarUsuarioPage = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        password: "",
        repetirPassword: "",
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = [];

        
        if (!formData.nombre.trim()) {
            newErrors.push("El nombre no puede estar vacío.");
        }
        if (formData.nombre.length > 30) {
            newErrors.push("El nombre no puede tener más de 30 caracteres.");
        }

        
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

        
        if (formData.password !== formData.repetirPassword) {
            newErrors.push("Las contraseñas no coinciden.");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const isValid = validateForm();
        if (isValid) {
            const response = await actualizarUsuario(formData);
            if (response?.error) {
                setErrors([response.error]);
                notifyError(response.error);
            } else {
                notifySuccess("Usuario actualizado correctamente.");
                setTimeout(() => navigate("/"), 2000);
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
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre del usuario:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
                        title="Solo letras y espacios"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="repetirPassword">Repetir Password:</label>
                    <input
                        type="password"
                        id="repetirPassword"
                        name="repetirPassword"
                        value={formData.repetirPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Usuario</button>
            </form>
            {errors.length > 0 && (
                <div style={{ color: "red" }}>
                    <h3>Errores:</h3>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EditarUsuarioPage;
