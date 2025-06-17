import api from "../axiosConfig";
import { getAuthData } from "@/helper/getAuthData";

// Servicio para obtener los mazos de un usuario
export const getMazos = async () => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }

    const { token, user } = authData;
    const usuarioId = user.id;

    const response = await api.get(`/usuarios/${usuarioId}/mazos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getMazos:", error);
    return { error: error.response?.data?.error || "Error al obtener los mazos del usuario" };
  }
};

// Servicio para eliminar un mazo
export const eliminarMazo = async (mazoId) => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }

    const { token, user } = authData;
    const usuarioId = user.id;

    const response = await api.delete(`/mazos/${mazoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { usuarioId },
    });
    return response.data;
  } catch (error) {
    console.error("Error en eliminarMazo:", error);
    return { error: error.response?.data?.error || "Error al eliminar el mazo" };
  }
};

// Servicio para editar un mazo
export const editarMazo = async (mazoId, nuevoNombre) => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }

    const { token, user } = authData;
    const usuarioId = user.id;

    if (!nuevoNombre || nuevoNombre.trim() === "") {
      return { error: "El nombre es requerido" };
    }

    const response = await api.put(`/mazos/${mazoId}`, 
      { nombre: nuevoNombre.trim(), usuarioId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en editarMazo:", error);
    return { error: error.response?.data?.error || "Error al editar el mazo" };
  }
};