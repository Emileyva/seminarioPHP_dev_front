import api from "../axiosConfig";
import { getAuthData } from "@/helper/getAuthData";

export const crearPartida = async (mazoId) => {
  try {
    const authData = getAuthData();
    debugger
    if (authData.error) {
      return authData;
    }

    const { token, user } = authData;
    const usuarioId = user.id; 

    const response = await api.post(
      "/partidas", 
      { mazo_id: mazoId, usuario_id: usuarioId },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Error al crear la partida" };
  }
};

export const realizarJugada = async (partidaId, cartaIdA) => {
  try {
    const authData = getAuthData();
    if (authData.error) {
      return authData;
    }

    const { token } = authData;

    // Agregar logs para depuración
    console.log("Realizando jugada con partidaId:", partidaId, "y cartaIdA:", cartaIdA);

    const response = await api.post(
      "/jugadas", // Endpoint para realizar la jugada
      { partida_id: partidaId, carta_id_a: cartaIdA }, // Datos requeridos por el backend
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token de autenticación
        },
      }
    );

    // Validación adicional de atributos
    if (!response.data.carta_servidor || !response.data.carta_servidor.atributo) {
      console.error("Error: La respuesta del servidor no contiene atributo válido.");
    }

    return response.data;
  } catch (error) {
    // Manejo de errores más detallado
    if (error.response?.data?.error) {
      console.error("Error del servidor:", error.response.data.error);
    }
    return { error: error.response?.data?.error || "Error al realizar la jugada" };
  }
};