export const getAuthData = () => {
  const token = localStorage.getItem("token"); // Obtener el token del localStorage
  if (!token) {
    return { error: "Token no encontrado" };
  }

  const user = JSON.parse(localStorage.getItem("user")); // Obtener el objeto user del localStorage
  if (!user || !user.id) {
    return { error: "Usuario no encontrado en el localStorage" };
  }

  return { token, user };
};