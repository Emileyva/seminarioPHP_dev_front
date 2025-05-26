import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Cambia esto
});

// Función para verificar si el token está expirado
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// Interceptor para agregar el token JWT a cada petición solo si no está expirado
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && isTokenExpired(token)) {
      localStorage.removeItem("token"); // Limpia el token expirado
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;