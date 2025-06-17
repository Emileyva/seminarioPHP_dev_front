import api from "../axiosConfig";
import jwt_decode from "jwt-decode";

// Función que envía credenciales al endpoint /login

//agregar a local aqui 

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/login", loginData);
    return response.data; // Se espera { token: "..." }
  } catch (error) {
    console.error("Error en loginUser:", error);
    if (error.response && error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: "Error al iniciar sesión" };
  }
};

// Función que obtiene datos de usuario utilizando el id (obtenido del token)
export const getUserData = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    if (!token) {
      return { error: "Token no encontrado" };
    }

    const response = await api.get(`/usuarios/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado Authorization
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

// Servicio que orquesta el login: valida campos, llama al endpoint /login, decodifica el token y obtiene datos de usuario
export const loginService = async (loginData) => {
  // Validación simple de campos
  if (!loginData.usuario || !loginData.nombre || !loginData.password) {
    return { error: "Todos los campos son requeridos" };
  }
  
  // Llamada al endpoint de login
  const loginRes = await loginUser(loginData);
  console.log("Respuesta de loginUser:", loginRes); debugger;
  if (loginRes.error) {
    return loginRes;
  }
  
  const token = loginRes.token;
  localStorage.setItem("token", token);
  
  // Decodificar token para obtener el id del usuario
  let userId;
  try {
    const payload = jwt_decode(token);
    userId = payload.id;
  } catch (e) {
    return { error: "Error al decodificar el token" };
  }
  
  // Obtener datos de usuario con el id obtenido
  const userDataRes = await getUserData(userId);
  if (userDataRes.error) {
    return userDataRes;
  }
  
  // Guardar datos de usuario en el localStorage
  localStorage.setItem("user", JSON.stringify(userDataRes));
  
  return { token, user: userDataRes };
};