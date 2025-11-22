import pool from "../config/db.js";

export const getCursosByProfesor = async (id_profesor) => {
  const query = `
    SELECT 
      id_curso,
      codigo,
      nombre_curso,
      semestre,
      seccion,
      id_usuario
    FROM curso
    WHERE id_usuario = ?
    ORDER BY semestre DESC, codigo ASC
  `;
  const [rows] = await pool.query(query, [id_profesor]);
  return rows;
};

export const getCursoById = async (id_curso) => {
  const query = `
    SELECT 
      id_curso,
      codigo,
      nombre_curso,
      semestre,
      seccion,
      id_usuario
    FROM curso
    WHERE id_curso = ?
  `;
  const [rows] = await pool.query(query, [id_curso]);
  return rows[0];
};

export const getAllCursos = async () => {
  const query = `
    SELECT 
      c.id_curso,
      c.codigo,
      c.nombre_curso,
      c.semestre,
      c.seccion,
      u.nombre as profesor_nombre,
      c.id_usuario
    FROM curso c
    JOIN usuario u ON c.id_usuario = u.id_usuario
    ORDER BY c.semestre DESC, c.codigo ASC
  `;
  const [rows] = await pool.query(query);
  return rows;
};

export const createCurso = async (curso) => {
  const { codigo, nombre_curso, semestre, seccion, id_usuario } = curso;
  const [result] = await pool.query(
    `INSERT INTO curso (codigo, nombre_curso, semestre, seccion, id_usuario) VALUES (?, ?, ?, ?, ?)`,
    [codigo, nombre_curso, semestre, seccion, id_usuario]
  );
  return result.insertId;
};

export const updateCurso = async (id_curso, curso) => {
  const { codigo, nombre_curso, semestre, seccion } = curso;
  const [result] = await pool.query(
    `UPDATE curso SET codigo = ?, nombre_curso = ?, semestre = ?, seccion = ? WHERE id_curso = ?`,
    [codigo, nombre_curso, semestre, seccion, id_curso]
  );
  return result;
};

export const deleteCurso = async (id_curso) => {
  const [result] = await pool.query(
    `DELETE FROM curso WHERE id_curso = ?`,
    [id_curso]
  );
  return result;
};
