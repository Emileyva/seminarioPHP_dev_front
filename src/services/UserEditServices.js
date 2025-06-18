import api from "../axiosConfig";
import { getAuthData } from "@/helper/getAuthData";

// Servicio para editar un usuario
export const actualizarUsuario = async ({ nombre, password }) => {
    try {
        const authData = getAuthData();
        if (authData.error) {
            return authData;
        }

        const { token, user } = authData;
        const usuarioId = user.id;

        // Log para depuración
        console.log("Valor recibido en nombre:", nombre);

        // Asegura que nombre sea string antes de trim
        if (!String(nombre).trim()) {
            return { error: "El nombre es requerido" };
        }

        const nombreLimpio = String(nombre).trim();

        // Validación: solo letras y espacios
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreLimpio)) {
            return { error: "El nombre solo puede contener letras y espacios" };
        }

        // Define el body correctamente
        const body = { nombre: nombreLimpio };
        if (password && String(password).trim() !== "") {
            body.password = password;
        }

        // Log para depuración
        console.log("Enviando body:", body);

        // Agrega el token en los headers
        const response = await api.put(
            `/usuarios/${usuarioId}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        // Muestra el error completo para depuración
        console.error("Error en editarUsuario:", error, error.response?.data);
        return { error: error.response?.data?.error || "Error al editar el usuario" };
    }
};