import api from "../axiosConfig";

export const registrarUsuario = async (formData) => {
  try {
    const response = await api.post("/registro", formData);
    return response.data; // Devuelve el mensaje de éxito
  } catch (error) {
    console.error("Error en resgitro:", error);
    if (error.response) {
      return { error: error.response.data.error };
    }
    return { error: "Error al registrar el usuario. Inténtalo nuevamente." };
  }
};