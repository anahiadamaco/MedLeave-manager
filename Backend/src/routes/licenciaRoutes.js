import express from "express";
import * as LicenciaController from "../controllers/licenciaController.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole, ROLES } from "../middlewares/authorizacion.js";

const router = express.Router();

// GET todas las licencias - Solo FUNCIONARIO o ADMINISTRADOR
router.get("/", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), LicenciaController.getLicencias);

// GET licencias del usuario autenticado
router.get("/usuario/:id_usuario", authenticate, LicenciaController.getLicenciasUsuario);

// GET licencia por ID - Solo el usuario autenticado o FUNCIONARIO/ADMINISTRADOR
router.get("/:id", authenticate, LicenciaController.getLicencia);

// POST crear licencia - Solo ESTUDIANTE
router.post("/create", authenticate, requireRole(ROLES.ESTUDIANTE), LicenciaController.createLicencia);

// Ruta para subir licencia con archivo: JSON + base64 (sin multer) - Solo ESTUDIANTE
router.post("/upload", authenticate, requireRole(ROLES.ESTUDIANTE), LicenciaController.uploadLicencia);

export default router;