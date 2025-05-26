import axiosConfig from "../axiosConfig";

export const registrarUsuario = async (formData) => {
  try {
    const response = await axiosConfig.post("/registro", formData);
    return response.data; // Devuelve el mensaje de éxito
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error };
    }
    return { error: "Error al registrar el usuario. Inténtalo nuevamente." };
  }
};