export const getAuthData = () => {
  const token = localStorage.getItem("token"); 
  const token = localStorage.getItem("token"); 
  if (!token) {
    return { error: "Token no encontrado" };
  }

  const user = JSON.parse(localStorage.getItem("user")); 
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) {
    return { error: "Usuario no encontrado en el localStorage" };
  }

  return { token, user };
};