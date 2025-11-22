/**
 * 🌐 URL del Backend Centralizado
 * Todos los desarrolladores usan el MISMO backend
 * 
 * Si quieres cambiar a un servidor en la nube, solo cambia esta URL
 */

export const API_BASE_URL = "http://192.168.100.231:3000";

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
  GET_BY_USER: (id: number) => `${API_BASE_URL}/api/licencias/usuario/${id}`,
  CREATE: `${API_BASE_URL}/api/licencias`,
  UPLOAD: `${API_BASE_URL}/api/licencias/upload`,
  UPDATE: (id: number) => `${API_BASE_URL}/api/licencias/${id}`,
  DELETE: (id: number) => `${API_BASE_URL}/api/licencias/${id}`,
  EDIT: (id: number) => `${API_BASE_URL}/api/licencias/${id}/editar`,
  GET_SOLICITUDES_PENDIENTES: `${API_BASE_URL}/api/licencias/solicitudes/pendientes`,
  APROBAR: (id: number) => `${API_BASE_URL}/api/licencias/${id}/aprobar`,
  RECHAZAR: (id: number) => `${API_BASE_URL}/api/licencias/${id}/rechazar`,
  // Rutas para profesor
  GET_PROFESOR_HISTORIAL: `${API_BASE_URL}/api/licencias/profesor/historial/all`,
  GET_PROFESOR_CURSO: (id_curso: number) => `${API_BASE_URL}/api/licencias/profesor/curso/${id_curso}`,
};

// Rutas de notificaciones
export const NOTIFICACION_ROUTES = {
  GET_ALL: `${API_BASE_URL}/api/notificaciones`,
  GET_BY_USER: (id: number) => `${API_BASE_URL}/api/notificaciones/usuario/${id}`,
  GET_NO_LEIDAS: (id: number) => `${API_BASE_URL}/api/notificaciones/usuario/${id}/no-leidas`,
  CREATE: `${API_BASE_URL}/api/notificaciones`,
  MARK_READ: (id: number) => `${API_BASE_URL}/api/notificaciones/${id}/leida`,
  MARK_ALL_READ: (id: number) => `${API_BASE_URL}/api/notificaciones/usuario/${id}/leidas`,
  DELETE: (id: number) => `${API_BASE_URL}/api/notificaciones/${id}`,
};

// Rutas de cursos
export const CURSOS_ROUTES = {
  GET_ALL: `${API_BASE_URL}/api/cursos`,
  GET_PROFESOR: `${API_BASE_URL}/api/cursos/profesor/mis-cursos`,
  GET_ONE: (id: number) => `${API_BASE_URL}/api/cursos/${id}`,
};

