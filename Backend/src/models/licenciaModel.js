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
      COALESCE(
        JSON_ARRAYAGG(
          IF(c.id_curso IS NOT NULL,
            JSON_OBJECT(
              'id_curso', c.id_curso,
              'nombre_curso', c.nombre_curso,
              'codigo', c.codigo
            ),
            NULL
          )
        ),
        JSON_ARRAY()
      ) as cursos,
      ca.hash as archivo_hash
    FROM licenciamedica lm
    LEFT JOIN licencia_curso lc ON lm.id_licencia = lc.id_licencia
    LEFT JOIN curso c ON lc.id_curso = c.id_curso
    LEFT JOIN archivolicencia ca ON lm.id_licencia = ca.id_licencia
    WHERE lm.id_usuario = ?
    GROUP BY lm.id_licencia, ca.id_archivo
    ORDER BY lm.fecha_creacion DESC
  `;
  const [rows] = await pool.query(query, [id_usuario]);
  
  // Process rows to clean up null course data
  return rows.map(row => {
    let cursosArray = [];
    
    // Parse cursos if it's a string (JSON)
    if (typeof row.cursos === 'string') {
      try {
        cursosArray = JSON.parse(row.cursos);
      } catch (e) {
        cursosArray = [];
      }
    } else if (Array.isArray(row.cursos)) {
      cursosArray = row.cursos;
    }
    
    // Filter out null values
    const cursosFiltrados = cursosArray.filter(c => c !== null && c.id_curso !== null && c.id_curso !== undefined);
    
    return {
      ...row,
      cursos: cursosFiltrados
    };
  });
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