import express from "express";
import * as CursoController from "../controllers/cursoController.js";
import { authenticate } from "../middlewares/auth.js";
import { requireRole, ROLES } from "../middlewares/authorizacion.js";

const router = express.Router();

// GET todos los cursos - Públicos (requiere autenticación)
router.get("/", authenticate, CursoController.getCursos);

// GET cursos del profesor autenticado - Solo PROFESOR
router.get("/profesor/mis-cursos", authenticate, requireRole(ROLES.PROFESOR), CursoController.getCursosByProfesor);

// GET un curso específico
router.get("/:id", authenticate, CursoController.getCurso);

// POST crear curso - Solo PROFESOR
router.post("/", authenticate, requireRole(ROLES.PROFESOR), CursoController.createCurso);

// PUT actualizar curso - Solo PROFESOR (propietario)
router.put("/:id", authenticate, requireRole(ROLES.PROFESOR), CursoController.updateCurso);

// DELETE eliminar curso - Solo PROFESOR (propietario)
router.delete("/:id", authenticate, requireRole(ROLES.PROFESOR), CursoController.deleteCurso);

export default router;
