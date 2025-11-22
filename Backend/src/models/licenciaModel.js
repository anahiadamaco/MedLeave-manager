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

export const getLicenciasPendientes = async () => {
  const query = `
    SELECT 
      lm.id_licencia,
      lm.folio,
      lm.fecha_emision,
      lm.fecha_inicio,
      lm.fecha_fin,
      lm.motivo_medico,
      lm.estado,
      u.id_usuario,
      u.nombre,
      u.correo_usuario as correo,
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
      ) as cursos
    FROM licenciamedica lm
    JOIN usuario u ON lm.id_usuario = u.id_usuario
    LEFT JOIN licencia_curso lc ON lm.id_licencia = lc.id_licencia
    LEFT JOIN curso c ON lc.id_curso = c.id_curso
    WHERE lm.estado = 'pendiente'
    GROUP BY lm.id_licencia, u.id_usuario
    ORDER BY lm.fecha_creacion DESC
  `;
  const [rows] = await pool.query(query);
  
  return rows.map(row => {
    let cursosArray = [];
    
    if (typeof row.cursos === 'string') {
      try {
        cursosArray = JSON.parse(row.cursos);
      } catch (e) {
        cursosArray = [];
      }
    } else if (Array.isArray(row.cursos)) {
      cursosArray = row.cursos;
    }
    
    const cursosFiltrados = cursosArray.filter(c => c !== null && c.id_curso !== null);
    
    return {
      ...row,
      rut: "N/A",  // RUT no disponible en la BD actualmente
      cursos: cursosFiltrados
    };
  });
};

export const updateLicenciaEstado = async (id_licencia, estado, motivo_rechazo = null) => {
  if (estado === 'rechazado') {
    const [result] = await pool.query(
      `UPDATE licenciamedica SET estado = ?, motivo_rechazo = ? WHERE id_licencia = ?`,
      [estado, motivo_rechazo, id_licencia]
    );
    return result;
  } else {
    const [result] = await pool.query(
      `UPDATE licenciamedica SET estado = ? WHERE id_licencia = ?`,
      [estado, id_licencia]
    );
    return result;
  }
};

export const getLicenciasByProfesor = async (id_profesor) => {
  const query = `
    SELECT 
      lm.id_licencia,
      lm.folio,
      lm.fecha_emision,
      lm.fecha_inicio,
      lm.fecha_fin,
      lm.motivo_medico,
      lm.estado,
      u.id_usuario as id_estudiante,
      u.nombre as nombre_estudiante,
      u.correo_usuario as correo_estudiante,
      c.id_curso,
      c.codigo as codigo_curso,
      c.nombre_curso,
      c.semestre,
      ca.hash as archivo_hash
    FROM licenciamedica lm
    JOIN usuario u ON lm.id_usuario = u.id_usuario
    JOIN licencia_curso lc ON lm.id_licencia = lc.id_licencia
    JOIN curso c ON lc.id_curso = c.id_curso
    LEFT JOIN archivolicencia ca ON lm.id_licencia = ca.id_licencia
    WHERE c.id_usuario = ?
    ORDER BY lm.fecha_creacion DESC, lm.id_licencia DESC
  `;
  
  const [rows] = await pool.query(query, [id_profesor]);
  
  // Agrupar licencias por id_licencia para manejar múltiples cursos
  const licenciasMap = new Map();
  
  rows.forEach(row => {
    const key = row.id_licencia;
    
    if (!licenciasMap.has(key)) {
      licenciasMap.set(key, {
        id_licencia: row.id_licencia,
        folio: row.folio,
        fecha_emision: row.fecha_emision,
        fecha_inicio: row.fecha_inicio,
        fecha_fin: row.fecha_fin,
        motivo_medico: row.motivo_medico,
        estado: row.estado,
        id_estudiante: row.id_estudiante,
        nombre_estudiante: row.nombre_estudiante,
        correo_estudiante: row.correo_estudiante,
        archivo_hash: row.archivo_hash,
        cursos: []
      });
    }
    
    const licencia = licenciasMap.get(key);
    
    // Agregar curso si no está duplicado
    if (row.id_curso && !licencia.cursos.find(c => c.id_curso === row.id_curso)) {
      licencia.cursos.push({
        id_curso: row.id_curso,
        codigo_curso: row.codigo_curso,
        nombre_curso: row.nombre_curso,
        semestre: row.semestre
      });
    }
  });
  
  return Array.from(licenciasMap.values());
};

export const getLicenciasByProfesorYCurso = async (id_profesor, id_curso) => {
  const query = `
    SELECT 
      lm.id_licencia,
      lm.folio,
      lm.fecha_emision,
      lm.fecha_inicio,
      lm.fecha_fin,
      lm.motivo_medico,
      lm.estado,
      u.id_usuario as id_estudiante,
      u.nombre as nombre_estudiante,
      u.correo_usuario as correo_estudiante,
      c.id_curso,
      c.codigo as codigo_curso,
      c.nombre_curso,
      ca.hash as archivo_hash
    FROM licenciamedica lm
    JOIN usuario u ON lm.id_usuario = u.id_usuario
    JOIN licencia_curso lc ON lm.id_licencia = lc.id_licencia
    JOIN curso c ON lc.id_curso = c.id_curso
    LEFT JOIN archivolicencia ca ON lm.id_licencia = ca.id_licencia
    WHERE c.id_usuario = ? AND c.id_curso = ?
    ORDER BY lm.fecha_creacion DESC
  `;
  
  const [rows] = await pool.query(query, [id_profesor, id_curso]);
  
  return rows.map(row => ({
    id_licencia: row.id_licencia,
    folio: row.folio,
    fecha_emision: row.fecha_emision,
    fecha_inicio: row.fecha_inicio,
    fecha_fin: row.fecha_fin,
    motivo_medico: row.motivo_medico,
    estado: row.estado,
    id_estudiante: row.id_estudiante,
    nombre_estudiante: row.nombre_estudiante,
    correo_estudiante: row.correo_estudiante,
    archivo_hash: row.archivo_hash,
    curso: {
      id_curso: row.id_curso,
      codigo_curso: row.codigo_curso,
      nombre_curso: row.nombre_curso
    }
  }));
};