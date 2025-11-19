/**
 * 🌐 URL del Backend Centralizado
 * Todos los desarrolladores usan el MISMO backend
 * 
 * Si quieres cambiar a un servidor en la nube, solo cambia esta URL
 */

export const API_BASE_URL = "http://172.20.10.11:3000";

// Rutas de autenticación
export const AUTH_ROUTES = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
};

// Rutas de licencias
export const LICENCIA_ROUTES = {
  GET_ALL: `${API_BASE_URL}/api/licencias`,
  CREATE: `${API_BASE_URL}/api/licencias`,
  UPLOAD: `${API_BASE_URL}/api/licencias/upload`,
  UPDATE: (id: number) => `${API_BASE_URL}/api/licencias/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/api/licencias/${id}`,
};

// Rutas de notificaciones
export const NOTIFICACION_ROUTES = {
  GET_ALL: `${API_BASE_URL}/api/notificaciones`,
  CREATE: `${API_BASE_URL}/api/notificaciones`,
};
