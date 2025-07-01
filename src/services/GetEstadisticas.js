import api from "../axiosConfig";

export const getEstadisticas = async () => {
  try {
    const response = await api.get("/estadisticas");
    console.log("Estadísticas obtenidas:", response.data);
    return response.data;
  } catch (error) {
    // Log detallado
    console.error("Error obteniendo estadísticas:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    return { error: "Error obteniendo estadísticas" };
  }
};

export const getUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/usuarios/${usuarioId}`);
    console.log(" usuario obtenido:", response.data);
    return response.data;
  } catch (error) {
    // Log detallado
    console.error("Error obteniendo  usuario:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    return { error: "Error obteniendo usuario" };
  }
}