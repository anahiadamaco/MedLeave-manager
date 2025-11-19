import express from "express";
import * as NotificacionController from "../controllers/notificacionController.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole, ROLES } from "../middlewares/authorizacion.js";

const router = express.Router();

// GET todas las notificaciones - Solo FUNCIONARIO o ADMINISTRADOR
router.get("/", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), NotificacionController.getNotificaciones);

// GET notificaciones sin leer de un usuario
router.get("/usuario/:id_usuario/no-leidas", authenticate, NotificacionController.getNotificacionesNoLeidasUsuario);

// GET notificaciones de un usuario
router.get("/usuario/:id_usuario", authenticate, NotificacionController.getNotificacionesUsuario);

// POST crear notificación - Solo FUNCIONARIO o ADMINISTRADOR
router.post("/", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), NotificacionController.createNotificacion);

// PUT marcar notificación como leída
router.put("/:id_notificacion/leida", authenticate, NotificacionController.markAsRead);

// PUT marcar todas como leídas por usuario
router.put("/usuario/:id_usuario/leidas", authenticate, NotificacionController.markAllAsRead);

export default router;