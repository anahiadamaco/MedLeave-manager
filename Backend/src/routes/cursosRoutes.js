import express from "express";
import pool from "../config/db.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

/**
 * GET /api/cursos - Obtener cursos del alumno
 * Query: id_usuario (opcional, si no se pasa usa el del token)
 */
router.get("/", authenticate, async (req, res) => {
  try {
    const id_usuario = req.query.id_usuario || req.user.id_usuario;

    // Obtener cursos del alumno mediante la tabla matriculas
    const [cursos] = await pool.query(
      `SELECT 
        c.id_curso,
        c.codigo,
        c.nombre_curso,
        c.semestre,
        c.seccion,
        p.codigo as periodo_codigo,
        u.nombre as profesor_nombre
      FROM matriculas m
      JOIN curso c ON m.id_curso = c.id_curso
      JOIN periodosacademicos p ON c.id_periodo = p.id_periodo
      JOIN usuario u ON c.id_usuario = u.id_usuario
      WHERE m.id_usuario = ? AND p.activo = 1
      ORDER BY c.semestre, c.codigo`,
      [id_usuario]
    );

    res.json({
      success: true,
      data: cursos,
      message: `${cursos.length} cursos encontrados`,
    });
  } catch (error) {
    console.error("Error en GET /cursos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener cursos",
      error: error.message,
    });
  }
});

/**
 * GET /api/cursos/:id_curso - Obtener detalles de un curso
 */
router.get("/:id_curso", authenticate, async (req, res) => {
  try {
    const { id_curso } = req.params;

    const [curso] = await pool.query(
      `SELECT 
        c.id_curso,
        c.codigo,
        c.nombre_curso,
        c.semestre,
        c.seccion,
        p.codigo as periodo_codigo,
        u.nombre as profesor_nombre,
        u.correo_usuario as profesor_email
      FROM curso c
      JOIN periodosacademicos p ON c.id_periodo = p.id_periodo
      JOIN usuario u ON c.id_usuario = u.id_usuario
      WHERE c.id_curso = ?`,
      [id_curso]
    );

    if (curso.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    res.json({
      success: true,
      data: curso[0],
    });
  } catch (error) {
    console.error("Error en GET /cursos/:id_curso:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener curso",
      error: error.message,
    });
  }
});

export default router;
