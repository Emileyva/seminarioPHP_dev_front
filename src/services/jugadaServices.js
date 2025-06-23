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

    const response = await api.post(
      "/jugadas", // Endpoint para realizar la jugada
      { partida_id: partidaId, carta_id_a: cartaIdA }, // Datos requeridos por el backend
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token de autenticación
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Error al realizar la jugada" };
  }
};