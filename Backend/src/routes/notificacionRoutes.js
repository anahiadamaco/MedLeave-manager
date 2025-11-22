import express from "express";
import * as NotificacionController from "../controllers/notificacionController.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole, ROLES } from "../middlewares/authorizacion.js";

const router = express.Router();

// GET todas las notificaciones - Solo FUNCIONARIO o ADMINISTRADOR
router.get("/", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), NotificacionController.getNotificaciones);

// GET notificaciones de un usuario
router.get("/usuario/:id_usuario", authenticate, NotificacionController.getNotificacionesUsuario);

// GET notificaciones NO LEÍDAS de un usuario
router.get("/usuario/:id_usuario/no-leidas", authenticate, NotificacionController.getNotificacionesNoLeidas);

// PUT marcar una notificación como leída
router.put("/:id_notificacion/leida", authenticate, NotificacionController.markNotificacionLeida);

// PUT marcar TODAS las notificaciones como leídas
router.put("/usuario/:id_usuario/leidas", authenticate, NotificacionController.markAllNotificacionesLeidas);

// POST crear notificación
router.post("/", authenticate, NotificacionController.createNotificacion);

// DELETE eliminar notificación
router.delete("/:id_notificacion", authenticate, NotificacionController.deleteNotificacion);

export default router;