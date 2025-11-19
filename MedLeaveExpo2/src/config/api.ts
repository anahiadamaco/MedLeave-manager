/**
 * 🌐 URL del Backend Centralizado
 * Todos los desarrolladores usan el MISMO backend
 * 
 * Si quieres cambiar a un servidor en la nube, solo cambia esta URL
 */

// Detectar si es web o mobile
const isWeb = typeof window !== 'undefined' && typeof navigator !== 'undefined';
export const API_BASE_URL = isWeb ? "http://localhost:3000" : "http://192.168.100.231:3000";

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
