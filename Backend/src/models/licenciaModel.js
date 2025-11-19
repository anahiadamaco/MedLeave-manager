import pool from "../config/db.js";

export const getAllLicencias = async () => {
  const [rows] = await pool.query("SELECT * FROM licenciamedica");
  return rows;
};

export const getLicenciaById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM licenciamedica WHERE id_licencia = ?", [id]);
  return rows[0];
};

export const getLicenciasByUsuario = async (id_usuario) => {
  const query = `
    SELECT 
      lm.id_licencia,
      lm.folio,
      lm.fecha_emision,
      lm.fecha_inicio,
      lm.fecha_fin,
      lm.motivo_medico,
      lm.estado,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id_curso', c.id_curso,
          'nombre_curso', c.nombre_curso,
          'codigo', c.codigo
        )
      ) as cursos,
      ca.archivo_hash
    FROM licenciamedica lm
    LEFT JOIN licencia_curso lc ON lm.id_licencia = lc.id_licencia
    LEFT JOIN curso c ON lc.id_curso = c.id_curso
    LEFT JOIN archivolicencia ca ON lm.id_licencia = ca.id_licencia
    WHERE lm.id_usuario = ?
    GROUP BY lm.id_licencia
    ORDER BY lm.fecha_creacion DESC
  `;
  const [rows] = await pool.query(query, [id_usuario]);
  
  // Process rows to clean up null course data
  return rows.map(row => ({
    ...row,
    cursos: row.cursos ? row.cursos.filter(c => c.id_curso !== null) : []
  }));
};

export const createLicencia = async (licencia) => {
  const { folio, fecha_emision, fecha_inicio, fecha_fin, id_usuario, motivo_medico } = licencia;
  const [result] = await pool.query(
    `INSERT INTO licenciamedica (folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, fecha_creacion, id_usuario) 
     VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
    [folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, id_usuario]
  );
  return result.insertId;
};