/**
 * Sistema de Autorización basado en Roles (RBAC)
 * 
 * Roles:
 * 1 - PROFESOR: Puede ver estudiantes, licencias, crear notificaciones
 * 2 - ESTUDIANTE: Puede crear y ver sus propias licencias
 * 3 - FUNCIONARIO: Admin con permisos generales
 * 4 - ADMINISTRADOR: Maneja matriculación y configuración
 */

export const ROLES = {
  PROFESOR: 1,
  ESTUDIANTE: 2,
  FUNCIONARIO: 3,
  ADMINISTRADOR: 4,
};

/**
 * Middleware para verificar que el usuario tiene uno de los roles especificados
 * @param {...number} allowedRoles - IDs de roles permitidos
 * @returns {Function} Middleware
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // req.user fue establecido por el middleware authenticate
      if (!req.user) {
        const error = new Error('Usuario no autenticado');
        error.statusCode = 401;
        return next(error);
      }

      const userRole = req.user.id_rol;

      console.log(`[AUTHZ] Usuario ${req.user.id_usuario} con rol ${userRole} accediendo a ${req.method} ${req.path}`);
      console.log(`[AUTHZ] Roles permitidos: ${allowedRoles.join(', ')}`);

      if (!allowedRoles.includes(userRole)) {
        const error = new Error(`No tienes permisos para acceder a este recurso. Tu rol es ${userRole}`);
        error.statusCode = 403;
        return next(error);
      }

      console.log(`[AUTHZ] ✅ Acceso permitido`);
      next();
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  };
};

/**
 * Helpers para verificar roles específicos
 */
export const isProfesor = (id_rol) => id_rol === ROLES.PROFESOR;
export const isEstudiante = (id_rol) => id_rol === ROLES.ESTUDIANTE;
export const isFuncionario = (id_rol) => id_rol === ROLES.FUNCIONARIO;
export const isAdministrador = (id_rol) => id_rol === ROLES.ADMINISTRADOR;
export const isFuncionarioOrAdministrador = (id_rol) =>
  id_rol === ROLES.FUNCIONARIO || id_rol === ROLES.ADMINISTRADOR;
