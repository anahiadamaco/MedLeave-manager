import * as CursoModel from "../models/cursoModel.js";

export const getCursos = async (req, res) => {
  try {
    console.log("📍 [CURSOS] GET /api/cursos");
    const cursos = await CursoModel.getAllCursos();
    console.log(`✅ [CURSOS] ${cursos.length} cursos encontrados`);
    res.json({ success: true, data: cursos });
  } catch (error) {
    console.error("❌ [CURSOS] Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCursosByProfesor = async (req, res) => {
  try {
    const id_profesor = req.user.id_usuario;
    console.log(`📍 [CURSOS PROFESOR] Buscando cursos para profesor: ${id_profesor}`);
    
    const cursos = await CursoModel.getCursosByProfesor(id_profesor);
    console.log(`✅ [CURSOS PROFESOR] ${cursos.length} cursos encontrados`);
    
    res.json({ success: true, data: cursos });
  } catch (error) {
    console.error(`❌ [CURSOS PROFESOR] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCurso = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📍 [CURSO] Buscando curso: ${id}`);
    
    const curso = await CursoModel.getCursoById(id);
    if (!curso) {
      console.log(`❌ [CURSO] Curso no encontrado: ${id}`);
      return res.status(404).json({ success: false, error: "Curso no encontrado" });
    }
    
    console.log(`✅ [CURSO] Curso encontrado: ${curso.codigo}`);
    res.json({ success: true, data: curso });
  } catch (error) {
    console.error(`❌ [CURSO] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createCurso = async (req, res) => {
  try {
    const { codigo, nombre_curso, semestre, seccion } = req.body;
    const id_usuario = req.user.id_usuario;
    
    if (!codigo || !nombre_curso || !semestre) {
      return res.status(400).json({ success: false, error: "Faltan campos requeridos" });
    }
    
    console.log(`📍 [CREAR CURSO] Creando curso: ${codigo}`);
    
    const id = await CursoModel.createCurso({
      codigo,
      nombre_curso,
      semestre,
      seccion: seccion || 1,
      id_usuario
    });
    
    console.log(`✅ [CREAR CURSO] Curso creado con ID: ${id}`);
    res.status(201).json({ success: true, message: "Curso creado", id });
  } catch (error) {
    console.error(`❌ [CREAR CURSO] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, nombre_curso, semestre, seccion } = req.body;
    
    if (!codigo || !nombre_curso || !semestre) {
      return res.status(400).json({ success: false, error: "Faltan campos requeridos" });
    }
    
    console.log(`📍 [ACTUALIZAR CURSO] Actualizando curso: ${id}`);
    
    const curso = await CursoModel.getCursoById(id);
    if (!curso) {
      return res.status(404).json({ success: false, error: "Curso no encontrado" });
    }
    
    await CursoModel.updateCurso(id, {
      codigo,
      nombre_curso,
      semestre,
      seccion: seccion || 1
    });
    
    console.log(`✅ [ACTUALIZAR CURSO] Curso actualizado: ${id}`);
    res.json({ success: true, message: "Curso actualizado" });
  } catch (error) {
    console.error(`❌ [ACTUALIZAR CURSO] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCurso = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`📍 [ELIMINAR CURSO] Eliminando curso: ${id}`);
    
    const curso = await CursoModel.getCursoById(id);
    if (!curso) {
      return res.status(404).json({ success: false, error: "Curso no encontrado" });
    }
    
    await CursoModel.deleteCurso(id);
    
    console.log(`✅ [ELIMINAR CURSO] Curso eliminado: ${id}`);
    res.json({ success: true, message: "Curso eliminado" });
  } catch (error) {
    console.error(`❌ [ELIMINAR CURSO] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};
