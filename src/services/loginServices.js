import api from "../axiosConfig";
import jwt_decode from "jwt-decode";
 

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Error en loginUser:", error);
    if (error.response && error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: "Error al iniciar sesión" };
  }
};

export const getUserData = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "Token no encontrado" };
    }

    const response = await api.get(`/usuarios/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getUserData:", error);
    if (error.response && error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: "Error al obtener datos de usuario" };
  }
};


export const loginService = async (loginData) => {
  
  if (!loginData.usuario || !loginData.nombre || !loginData.password) {
    return { error: "Todos los campos son requeridos" };
  }
  
  
  const loginRes = await loginUser(loginData);
  console.log("Respuesta de loginUser:", loginRes); 
  if (loginRes.error) {
    return loginRes;
  }
  
  const token = loginRes.token;
  localStorage.setItem("token", token);
  
  
  let userId;
  try {
    const payload = jwt_decode(token);
    userId = payload.id;
  } catch (e) {
    return { error: "Error al decodificar el token" };
  }
  
  
  const userDataRes = await getUserData(userId);
  if (userDataRes.error) {
    return userDataRes;
  }
  
  
  localStorage.setItem("user", JSON.stringify(userDataRes));
  
  return { token, user: userDataRes };
};