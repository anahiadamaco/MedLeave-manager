import express from "express";
import * as LicenciaController from "../controllers/licenciaController.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole, ROLES } from "../middlewares/authorizacion.js";

const router = express.Router();

// GET todas las licencias - Solo FUNCIONARIO o ADMINISTRADOR
router.get("/", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), LicenciaController.getLicencias);

// GET todas las solicitudes pendientes - Solo FUNCIONARIO o ADMINISTRADOR
router.get("/solicitudes/pendientes", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), LicenciaController.getLicenciasPendientes);

// GET licencias del usuario autenticado
router.get("/usuario/:id_usuario", authenticate, LicenciaController.getLicenciasUsuario);

// GET licencias de los cursos del profesor - Solo PROFESOR
router.get("/profesor/historial/all", authenticate, requireRole(ROLES.PROFESOR), LicenciaController.getLicenciasProfesor);

// GET licencias de un curso específico del profesor - Solo PROFESOR
router.get("/profesor/curso/:id_curso", authenticate, requireRole(ROLES.PROFESOR), LicenciaController.getLicenciasProfesorCurso);

// GET licencia por ID - Solo el usuario autenticado o FUNCIONARIO/ADMINISTRADOR
router.get("/:id", authenticate, LicenciaController.getLicencia);

// POST crear licencia - Solo ESTUDIANTE
router.post("/create", authenticate, requireRole(ROLES.ESTUDIANTE), LicenciaController.createLicencia);

// Ruta para subir licencia con archivo: JSON + base64 (sin multer) - Solo ESTUDIANTE
router.post("/upload", authenticate, requireRole(ROLES.ESTUDIANTE), LicenciaController.uploadLicencia);

// PUT aprobar licencia - Solo FUNCIONARIO o ADMINISTRADOR
router.put("/:id_licencia/aprobar", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), LicenciaController.aprobarLicencia);

// PUT rechazar licencia - Solo FUNCIONARIO o ADMINISTRADOR
router.put("/:id_licencia/rechazar", authenticate, requireRole(ROLES.FUNCIONARIO, ROLES.ADMINISTRADOR), LicenciaController.rechazarLicencia);

// PUT editar licencia pendiente - Solo ESTUDIANTE (dueño de la licencia)
router.put("/:id_licencia/editar", authenticate, requireRole(ROLES.ESTUDIANTE), LicenciaController.editarLicencia);

// DELETE eliminar licencia pendiente - Solo ESTUDIANTE (dueño de la licencia)
router.delete("/:id_licencia", authenticate, requireRole(ROLES.ESTUDIANTE), LicenciaController.deletarLicencia);

export default router;