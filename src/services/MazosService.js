import api from "../axiosConfig";
import { getAuthData } from "@/helper/getAuthData";
//import kk from "@/assets/" Para ver como se hace

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

// Servicio para obtener las cartas de un mazo específico
export const getCartasDeMazo = async (mazoId) => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }

    const { token } = authData;

    const response = await api.get(`/mazos/${mazoId}/cartas`, { // <-- Agrega const aquí
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Se espera que sea un array de cartas
  } catch (error) {
    console.error("Error en getCartasDeMazo:", error);
    return { error: error.response?.data?.error || "Error al obtener las cartas del mazo" };
  }
};

// Servicio para crear un nuevo mazo
export const crearMazo = async (nombre, cartas) => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }
    const { token } = authData;

    const response = await api.post(
      "/mazos",
      { nombre, cartas },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en crearMazo:", error);
    return { error: error.response?.data?.error || "Error al crear el mazo" };
  }
};

// Servicio para listar cartas con filtros
export const listarCartas = async (atributo = "", nombre = "") => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }
    const { token } = authData;

    const params = {};
    if (atributo) params.atributo = atributo;
    if (nombre) params.nombre = nombre;

    const response = await api.get("/cartas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error en listarCartas:", error);
    return { error: error.response?.data?.error || "Error al obtener cartas" };
  }
};


export const getMazoServidor = async () => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }
    const { token } = authData;

    const response = await api.get("/mazos/servidor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve el mazo y sus cartas
  } catch (error) {
    console.error("Error en getMazoServidor:", error);
    return { error: error.response?.data?.error || "Error al obtener el mazo del servidor" };
  }
};