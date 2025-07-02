import api from "../axiosConfig";
import { getAuthData } from "@/helper/getAuthData";

export const actualizarUsuario = async ({ nombre, password }) => {
    try {
        const authData = getAuthData();
        if (authData.error) {
            return authData;
        }

        const { token, user } = authData;
        const usuarioId = user.id;

        
        console.log("Valor recibido en nombre:", nombre);

        
        if (!String(nombre).trim()) {
            return { error: "El nombre es requerido" };
        }

        const nombreLimpio = String(nombre).trim();

        
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombreLimpio)) {
            return { error: "El nombre solo puede contener letras y espacios" };
        }

        
        const body = { nombre: nombreLimpio };
        if (password && String(password).trim() !== "") {
            body.password = password;
        }

        
        console.log("Enviando body:", body);

        
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
        
        console.error("Error en editarUsuario:", error, error.response?.data);
        return { error: error.response?.data?.error || "Error al editar el usuario" };
    }
};