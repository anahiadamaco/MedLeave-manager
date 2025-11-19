import express from "express";
import * as NotificacionController from "../controllers/notificacionController.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole, ROLES } from "../middlewares/authorizacion.js";

const router = express.Router();

// GET todas las notificaciones - Solo FUNCIONARIO o ADMINISTRADOR
router.get("/", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), NotificacionController.getNotificaciones);

// GET notificaciones de un usuario - Solo FUNCIONARIO/ADMINISTRADOR o el usuario mismo
router.get("/usuario/:id_usuario", authenticate, NotificacionController.getNotificacionesUsuario);

// PUT marcar notificación como leída
router.put("/:id_notificacion/leida", authenticate, NotificacionController.markNotificacionLeida);

// POST crear notificación - Solo FUNCIONARIO o ADMINISTRADOR
router.post("/", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), NotificacionController.createNotificacion);

export default router;